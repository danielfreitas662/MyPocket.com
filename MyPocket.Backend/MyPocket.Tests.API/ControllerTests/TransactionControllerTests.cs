using Microsoft.AspNetCore.Mvc;
using Moq;
using MyPocket.API.Controllers;
using MyPocket.Tests.API.Fixtures;
using Xunit;
using FluentAssertions;
using MyPocket.Application.Interfaces;
using System.Collections.Generic;
using MyPocket.Application.DTO;
using System.Linq;
using MyPocket.Infra.Data.Context;
using System;

namespace MyPocket.Tests.API;

public class TransactionControllerTests
{
  private Mock<IApplicationService> applicationServiceMock = new Mock<IApplicationService>();
  private Mock<ITransactionService> transactionServiceMock = new Mock<ITransactionService>();
  private UserData userIdentity;
  public TransactionControllerTests()
  {
    userIdentity = new UserData
    {
      UserId = "123",
      UserName = "Daniel Robson",
      Email = "danielrobson@gmail.com"
    };
  }

  [Fact]
  public void GetAll_Should_Return_Ok_With_Transaction_List()
  {
    var transactionsMock = TransactionFixtures.GetTransactions();
    var contextMock = new MockHttpContext(userIdentity);
    TransactionController sut = new TransactionController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    transactionServiceMock.Setup(x => x.GetAll(userIdentity.UserId)).Returns(transactionsMock);
    applicationServiceMock.Setup(x => x.Transaction).Returns(transactionServiceMock.Object);
    var result = sut.GetAll();
    var objectResult = Assert.IsType<OkObjectResult>(result);
    var resultData = Assert.IsType<List<TransactionDTO>>(objectResult.Value);
    Assert.Same(transactionsMock, resultData);
  }
  [Fact]
  public void GetAll_Should_Return_Ok_With_Empty_List()
  {
    var transactionsMock = TransactionFixtures.GetTransactions();
    var contextMock = new MockHttpContext(userIdentity);
    TransactionController sut = new TransactionController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    transactionServiceMock.Setup(x => x.GetAll(userIdentity.UserId)).Returns(new List<TransactionDTO>());
    applicationServiceMock.Setup(x => x.Transaction).Returns(transactionServiceMock.Object);
    var result = sut.GetAll();
    var objectResult = Assert.IsType<OkObjectResult>(result);
    var resultData = Assert.IsType<List<TransactionDTO>>(objectResult.Value);
    Assert.Equal(0, resultData.Count());
  }
  [Fact]
  public async void AddOrUpdate_Should_Return_Ok_With_Updated_Entity_When_Valid_Transaction_Id()
  {
    var transactionsMock = TransactionFixtures.GetTransactions();
    var contextMock = new MockHttpContext(userIdentity);
    TransactionController sut = new TransactionController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    transactionServiceMock.Setup(x => x.GetByIdAsync(userIdentity.UserId, transactionsMock[0].Id.Value)).ReturnsAsync(() => transactionsMock[0]);
    transactionServiceMock.Setup(x => x.UpdateAsync(It.IsAny<UserData>(), It.IsAny<TransactionDTO>(), It.IsAny<TransactionDTO>())).ReturnsAsync(() => transactionsMock[0]);
    applicationServiceMock.Setup(x => x.Transaction).Returns(transactionServiceMock.Object);
    var result = await sut.AddOrUpdate(transactionsMock[0]);
    var objectResult = Assert.IsType<OkObjectResult>(result);
    var resultData = Assert.IsType<AddOrUpdateResult<TransactionDTO>>(objectResult.Value);
    Assert.Equal(false, resultData.New);
    Assert.Same(transactionsMock[0], resultData.Entity);
  }
  [Fact]
  public async void AddOrUpdate_Should_Return_NotFound_With_Invalid_Transaction_Id()
  {
    var transactionsMock = TransactionFixtures.GetTransactions();
    var contextMock = new MockHttpContext();
    TransactionController sut = new TransactionController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    transactionServiceMock.Setup(x => x.GetByIdAsync(userIdentity.UserId, It.IsAny<Guid>())).ReturnsAsync(() => null);
    applicationServiceMock.Setup(x => x.Transaction).Returns(transactionServiceMock.Object);

    var result = await sut.AddOrUpdate(transactionsMock[0]);
    var objectResult = Assert.IsAssignableFrom<NotFoundObjectResult>(result);
    Assert.Equal($"Transaction Id: {transactionsMock[0].Id.Value} not found", objectResult.Value);
  }
  [Fact]
  public async void AddOrUpdate_Should_Return_Ok_With_No_Transaction_Id()
  {
    var newTransactionId = Guid.NewGuid();
    var newTransaction = new TransactionDTO
    {
      Description = "School",
      Amount = 1000,
      Date = DateTime.Today,
      UserId = UserFixtures.GetUsers()[0].Id,
      CategoryId = CategoryFixtures.GetCategories()[0].Id.Value,
      AccountId = AccountFixtures.GetAccounts()[0].Id.Value,
      Id = null
    };
    var contextMock = new MockHttpContext(userIdentity);
    TransactionController sut = new TransactionController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    transactionServiceMock.Setup(x => x.AddAsync(It.IsAny<UserData>(), It.IsAny<TransactionDTO>())).ReturnsAsync(() =>
    {
      newTransaction.Id = newTransactionId;
      return newTransaction;
    });
    applicationServiceMock.Setup(x => x.Transaction).Returns(transactionServiceMock.Object);

    var result = await sut.AddOrUpdate(newTransaction);
    var objectResult = Assert.IsAssignableFrom<OkObjectResult>(result);
    var value = Assert.IsAssignableFrom<AddOrUpdateResult<TransactionDTO>>(objectResult.Value);
    Assert.Equal(true, value.New);
    Assert.Equal(newTransactionId, value.Entity.Id);
  }
  [Fact]
  public async void Remove_Should_Return_Ok_With_Valid_Transaction_Id()
  {
    var transactionMock = TransactionFixtures.GetTransactions()[0];
    var contextMock = new MockHttpContext(userIdentity);
    TransactionController sut = new TransactionController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    transactionServiceMock.Setup(x => x.GetByIdAsync(It.IsAny<string>(), transactionMock.Id.Value)).ReturnsAsync(() => transactionMock);
    transactionServiceMock.Setup(x => x.RemoveAsync(It.IsAny<UserData>(), transactionMock));
    applicationServiceMock.Setup(x => x.Transaction).Returns(transactionServiceMock.Object);

    var result = await sut.Remove(transactionMock.Id.Value);
    var objectResult = Assert.IsAssignableFrom<OkObjectResult>(result);
    var value = Assert.IsAssignableFrom<Guid>(objectResult.Value);
  }
  [Fact]
  public async void Remove_Should_Return_NotFound_With_Invalid_Transaction_Id()
  {
    var transactionMock = TransactionFixtures.GetTransactions()[0];
    var contextMock = new MockHttpContext(userIdentity);
    TransactionController sut = new TransactionController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    transactionServiceMock.Setup(x => x.GetByIdAsync(It.IsAny<string>(), transactionMock.Id.Value)).ReturnsAsync(() => null);
    applicationServiceMock.Setup(x => x.Transaction).Returns(transactionServiceMock.Object);

    var result = await sut.Remove(transactionMock.Id.Value);
    var objectResult = Assert.IsAssignableFrom<NotFoundObjectResult>(result);
    Assert.Equal($"Transaction Id: {transactionMock.Id} not found", objectResult.Value);
  }
}