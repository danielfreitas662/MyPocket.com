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
using Microsoft.Extensions.Localization;

namespace MyPocket.Tests.API;

public class AccountControllerTests
{
  private Mock<IApplicationService> applicationServiceMock = new Mock<IApplicationService>();
  private Mock<IAccountService> accountServiceMock = new Mock<IAccountService>();
  private Mock<IStringLocalizer<AccountController>> localizerMock = new Mock<IStringLocalizer<AccountController>>();
  private UserData userIdentity;
  public AccountControllerTests()
  {
    userIdentity = new UserData
    {
      UserId = "123",
      UserName = "Daniel Robson",
      Email = "danielrobson@gmail.com"
    };
  }

  [Fact]
  public void GetAll_Should_Return_Ok_With_Account_List()
  {
    var accountsMock = AccountFixtures.GetAccounts();
    var contextMock = new MockHttpContext(userIdentity);
    AccountController sut = new AccountController(applicationServiceMock.Object, localizerMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    accountServiceMock.Setup(x => x.GetAll(userIdentity.UserId)).Returns(accountsMock);
    applicationServiceMock.Setup(x => x.Account).Returns(accountServiceMock.Object);
    var result = sut.GetAll();
    var objectResult = Assert.IsType<OkObjectResult>(result);
    var resultData = Assert.IsType<List<AccountDTO>>(objectResult.Value);
    Assert.Same(accountsMock, resultData);
  }
  [Fact]
  public void GetAll_Should_Return_Ok_With_Empty_List()
  {
    var accountsMock = AccountFixtures.GetAccounts();
    var contextMock = new MockHttpContext(userIdentity);
    AccountController sut = new AccountController(applicationServiceMock.Object, localizerMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    accountServiceMock.Setup(x => x.GetAll(userIdentity.UserId)).Returns(new List<AccountDTO>());
    applicationServiceMock.Setup(x => x.Account).Returns(accountServiceMock.Object);
    var result = sut.GetAll();
    var objectResult = Assert.IsType<OkObjectResult>(result);
    var resultData = Assert.IsType<List<AccountDTO>>(objectResult.Value);
    Assert.Equal(0, resultData.Count());
  }
  [Fact]
  public async void AddOrUpdate_Should_Return_Ok_With_Updated_Entity_When_Valid_Account_Id()
  {
    var accountsMock = AccountFixtures.GetAccounts();
    var contextMock = new MockHttpContext(userIdentity);
    AccountController sut = new AccountController(applicationServiceMock.Object, localizerMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    accountServiceMock.Setup(x => x.GetByIdAsync(userIdentity.UserId, accountsMock[0].Id)).ReturnsAsync(() => accountsMock[0]);
    accountServiceMock.Setup(x => x.UpdateAsync(It.IsAny<UserData>(), It.IsAny<AccountDTO>(), It.IsAny<AccountDTO>())).ReturnsAsync(() => accountsMock[0]);
    applicationServiceMock.Setup(x => x.Account).Returns(accountServiceMock.Object);
    var result = await sut.AddOrUpdate(accountsMock[0]);
    var objectResult = Assert.IsType<OkObjectResult>(result);
    var resultData = Assert.IsType<AddOrUpdateResult<AccountDTO>>(objectResult.Value);
    Assert.Equal(false, resultData.New);
    Assert.Same(accountsMock[0], resultData.Entity);
  }
  [Fact]
  public async void AddOrUpdate_Should_Return_NotFound_With_Invalid_Account_Id()
  {
    var accountsMock = AccountFixtures.GetAccounts();
    var contextMock = new MockHttpContext();
    AccountController sut = new AccountController(applicationServiceMock.Object, localizerMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    accountServiceMock.Setup(x => x.GetByIdAsync(userIdentity.UserId, It.IsAny<string>())).ReturnsAsync(() => null);
    applicationServiceMock.Setup(x => x.Account).Returns(accountServiceMock.Object);
    localizerMock.Setup(x => x["Account Id: {0} not found"]).Returns(new LocalizedString($"Account Id: {accountsMock[0].Id} not found", $"Account Id: {accountsMock[0].Id} not found"));

    var result = await sut.AddOrUpdate(accountsMock[0]);
    var objectResult = Assert.IsAssignableFrom<NotFoundObjectResult>(result);
    Assert.Equal($"Account Id: {accountsMock[0].Id} not found", objectResult.Value);
  }
  [Fact]
  public async void AddOrUpdate_Should_Return_Ok_With_No_Account_Id()
  {
    var newAccountId = Guid.NewGuid().ToString();
    var newAccount = new AccountDTO
    {
      Name = "new account",
      Id = null
    };
    var contextMock = new MockHttpContext(userIdentity);
    AccountController sut = new AccountController(applicationServiceMock.Object, localizerMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    accountServiceMock.Setup(x => x.AddAsync(It.IsAny<UserData>(), It.IsAny<AccountDTO>())).ReturnsAsync(() =>
    {
      newAccount.Id = newAccountId;
      return newAccount;
    });
    applicationServiceMock.Setup(x => x.Account).Returns(accountServiceMock.Object);

    var result = await sut.AddOrUpdate(newAccount);
    var objectResult = Assert.IsAssignableFrom<OkObjectResult>(result);
    var value = Assert.IsAssignableFrom<AddOrUpdateResult<AccountDTO>>(objectResult.Value);
    Assert.Equal(true, value.New);
    Assert.Equal(newAccountId, value.Entity.Id);
  }
  [Fact]
  public async void Remove_Should_Return_Ok_With_Valid_Account_Id()
  {
    var accountMock = AccountFixtures.GetAccounts()[0];
    var contextMock = new MockHttpContext(userIdentity);
    AccountController sut = new AccountController(applicationServiceMock.Object, localizerMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    accountServiceMock.Setup(x => x.GetByIdAsync(It.IsAny<string>(), accountMock.Id)).ReturnsAsync(() => accountMock);
    accountServiceMock.Setup(x => x.RemoveAsync(It.IsAny<UserData>(), accountMock));
    applicationServiceMock.Setup(x => x.Account).Returns(accountServiceMock.Object);

    var result = await sut.Remove(accountMock.Id);
    var objectResult = Assert.IsAssignableFrom<OkObjectResult>(result);
    var value = Assert.IsAssignableFrom<string>(objectResult.Value);
  }
  [Fact]
  public async void Remove_Should_Return_NotFound_With_Invalid_Account_Id()
  {
    var accountMock = AccountFixtures.GetAccounts()[0];
    var contextMock = new MockHttpContext(userIdentity);
    AccountController sut = new AccountController(applicationServiceMock.Object, localizerMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    accountServiceMock.Setup(x => x.GetByIdAsync(It.IsAny<string>(), accountMock.Id)).ReturnsAsync(() => null);
    applicationServiceMock.Setup(x => x.Account).Returns(accountServiceMock.Object);
    localizerMock.Setup(x => x["Account Id: {0} not found"]).Returns(new LocalizedString($"Account Id: {accountMock.Id} not found", $"Account Id: {accountMock.Id} not found"));

    var result = await sut.Remove(accountMock.Id);
    var objectResult = Assert.IsAssignableFrom<NotFoundObjectResult>(result);
    Assert.Equal($"Account Id: {accountMock.Id} not found", objectResult.Value);
  }
}