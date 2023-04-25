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

public class BudgetControllerTests
{
  private Mock<IApplicationService> applicationServiceMock = new Mock<IApplicationService>();
  private Mock<IBudgetService> budgetServiceMock = new Mock<IBudgetService>();
  private Mock<IStringLocalizer<BudgetController>> localizerMock = new Mock<IStringLocalizer<BudgetController>>();
  private UserData userIdentity;
  public BudgetControllerTests()
  {
    userIdentity = new UserData
    {
      UserId = "123",
      UserName = "Daniel Robson",
      Email = "danielrobson@gmail.com"
    };
  }

  [Fact]
  public void GetAll_Should_Return_Ok_With_Budget_List()
  {
    var budgetsMock = BudgetFixtures.GetBudgets();
    var contextMock = new MockHttpContext(userIdentity);
    BudgetController sut = new BudgetController(applicationServiceMock.Object, localizerMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    budgetServiceMock.Setup(x => x.GetAll(userIdentity.UserId)).Returns(budgetsMock);
    applicationServiceMock.Setup(x => x.Budget).Returns(budgetServiceMock.Object);
    var result = sut.GetAll();
    var objectResult = Assert.IsType<OkObjectResult>(result);
    var resultData = Assert.IsType<List<BudgetDTO>>(objectResult.Value);
    Assert.Same(budgetsMock, resultData);
  }
  [Fact]
  public void GetAll_Should_Return_Ok_With_Empty_List()
  {
    var budgetsMock = BudgetFixtures.GetBudgets();
    var contextMock = new MockHttpContext(userIdentity);
    BudgetController sut = new BudgetController(applicationServiceMock.Object, localizerMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    budgetServiceMock.Setup(x => x.GetAll(userIdentity.UserId)).Returns(new List<BudgetDTO>());
    applicationServiceMock.Setup(x => x.Budget).Returns(budgetServiceMock.Object);
    var result = sut.GetAll();
    var objectResult = Assert.IsType<OkObjectResult>(result);
    var resultData = Assert.IsType<List<BudgetDTO>>(objectResult.Value);
    Assert.Equal(0, resultData.Count());
  }
  [Fact]
  public async void AddOrUpdate_Should_Return_Ok_With_Updated_Entity_When_Valid_Budget_Id()
  {
    var budgetsMock = BudgetFixtures.GetBudgets();
    var contextMock = new MockHttpContext(userIdentity);
    BudgetController sut = new BudgetController(applicationServiceMock.Object, localizerMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    budgetServiceMock.Setup(x => x.GetByIdAsync(userIdentity.UserId, budgetsMock[0].Id)).ReturnsAsync(() => budgetsMock[0]);
    budgetServiceMock.Setup(x => x.UpdateAsync(It.IsAny<UserData>(), It.IsAny<BudgetDTO>(), It.IsAny<BudgetDTO>())).ReturnsAsync(() => budgetsMock[0]);
    applicationServiceMock.Setup(x => x.Budget).Returns(budgetServiceMock.Object);
    var result = await sut.AddOrUpdate(budgetsMock[0]);
    var objectResult = Assert.IsType<OkObjectResult>(result);
    var resultData = Assert.IsType<AddOrUpdateResult<BudgetDTO>>(objectResult.Value);
    Assert.Equal(false, resultData.New);
    Assert.Same(budgetsMock[0], resultData.Entity);
  }
  [Fact]
  public async void AddOrUpdate_Should_Return_NotFound_With_Invalid_Budget_Id()
  {
    var budgetsMock = BudgetFixtures.GetBudgets();
    var contextMock = new MockHttpContext();
    BudgetController sut = new BudgetController(applicationServiceMock.Object, localizerMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    budgetServiceMock.Setup(x => x.GetByIdAsync(userIdentity.UserId, It.IsAny<string>())).ReturnsAsync(() => null);
    applicationServiceMock.Setup(x => x.Budget).Returns(budgetServiceMock.Object);
    localizerMock.Setup(x => x["Budget Id: {0} not found"]).Returns(new LocalizedString($"Budget Id: {budgetsMock[0].Id} not found", $"Budget Id: {budgetsMock[0].Id} not found"));

    var result = await sut.AddOrUpdate(budgetsMock[0]);
    var objectResult = Assert.IsAssignableFrom<NotFoundObjectResult>(result);
    Assert.Equal($"Budget Id: {budgetsMock[0].Id} not found", objectResult.Value);
  }
  [Fact]
  public async void AddOrUpdate_Should_Return_Ok_With_No_Budget_Id()
  {
    var newBudgetId = Guid.NewGuid().ToString();
    var newBudget = new BudgetDTO
    {
      Month = DateTime.Today,
      Amount = 10,
      Id = null
    };
    var contextMock = new MockHttpContext(userIdentity);
    BudgetController sut = new BudgetController(applicationServiceMock.Object, localizerMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    budgetServiceMock.Setup(x => x.AddAsync(It.IsAny<UserData>(), It.IsAny<BudgetDTO>())).ReturnsAsync(() =>
    {
      newBudget.Id = newBudgetId;
      return newBudget;
    });
    applicationServiceMock.Setup(x => x.Budget).Returns(budgetServiceMock.Object);

    var result = await sut.AddOrUpdate(newBudget);
    var objectResult = Assert.IsAssignableFrom<OkObjectResult>(result);
    var value = Assert.IsAssignableFrom<AddOrUpdateResult<BudgetDTO>>(objectResult.Value);
    Assert.Equal(true, value.New);
    Assert.Equal(newBudgetId, value.Entity.Id);
  }
  [Fact]
  public async void Remove_Should_Return_Ok_With_Valid_Budget_Id()
  {
    var budgetMock = BudgetFixtures.GetBudgets()[0];
    var contextMock = new MockHttpContext(userIdentity);
    BudgetController sut = new BudgetController(applicationServiceMock.Object, localizerMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    budgetServiceMock.Setup(x => x.GetByIdAsync(It.IsAny<string>(), budgetMock.Id)).ReturnsAsync(() => budgetMock);
    budgetServiceMock.Setup(x => x.RemoveAsync(It.IsAny<UserData>(), budgetMock));
    applicationServiceMock.Setup(x => x.Budget).Returns(budgetServiceMock.Object);

    var result = await sut.Remove(budgetMock.Id);
    var objectResult = Assert.IsAssignableFrom<OkObjectResult>(result);
    var value = Assert.IsAssignableFrom<string>(objectResult.Value);
  }
  [Fact]
  public async void Remove_Should_Return_NotFound_With_Invalid_Budget_Id()
  {
    var budgetMock = BudgetFixtures.GetBudgets()[0];
    var contextMock = new MockHttpContext(userIdentity);
    BudgetController sut = new BudgetController(applicationServiceMock.Object, localizerMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    budgetServiceMock.Setup(x => x.GetByIdAsync(It.IsAny<string>(), budgetMock.Id)).ReturnsAsync(() => null);
    applicationServiceMock.Setup(x => x.Budget).Returns(budgetServiceMock.Object);
    localizerMock.Setup(x => x["Budget Id: {0} not found"]).Returns(new LocalizedString($"Budget Id: {budgetMock.Id} not found", $"Budget Id: {budgetMock.Id} not found"));

    var result = await sut.Remove(budgetMock.Id);
    var objectResult = Assert.IsAssignableFrom<NotFoundObjectResult>(result);
    Assert.Equal($"Budget Id: {budgetMock.Id} not found", objectResult.Value);
  }
}