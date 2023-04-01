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

public class CategoryControllerTests
{
  private Mock<IApplicationService> applicationServiceMock = new Mock<IApplicationService>();
  private Mock<ICategoryService> categoryServiceMock = new Mock<ICategoryService>();
  private UserData userIdentity;
  public CategoryControllerTests()
  {
    userIdentity = new UserData
    {
      UserId = "123",
      UserName = "Daniel Robson",
      Email = "danielrobson@gmail.com"
    };
  }

  [Fact]
  public void GetAll_Should_Return_Ok_With_Category_List()
  {
    var categoriesMock = CategoryFixtures.GetCategories();
    var contextMock = new MockHttpContext(userIdentity);
    CategoryController sut = new CategoryController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    categoryServiceMock.Setup(x => x.GetAll(userIdentity.UserId)).Returns(categoriesMock);
    applicationServiceMock.Setup(x => x.Category).Returns(categoryServiceMock.Object);
    var result = sut.GetAll();
    var objectResult = Assert.IsType<OkObjectResult>(result);
    var resultData = Assert.IsType<List<CategoryDTO>>(objectResult.Value);
    Assert.Same(categoriesMock, resultData);
  }
  [Fact]
  public void GetAll_Should_Return_Ok_With_Empty_List()
  {
    var categoriesMock = CategoryFixtures.GetCategories();
    var contextMock = new MockHttpContext(userIdentity);
    CategoryController sut = new CategoryController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    categoryServiceMock.Setup(x => x.GetAll(userIdentity.UserId)).Returns(new List<CategoryDTO>());
    applicationServiceMock.Setup(x => x.Category).Returns(categoryServiceMock.Object);
    var result = sut.GetAll();
    var objectResult = Assert.IsType<OkObjectResult>(result);
    var resultData = Assert.IsType<List<CategoryDTO>>(objectResult.Value);
    Assert.Equal(0, resultData.Count());
  }
  [Fact]
  public async void AddOrUpdate_Should_Return_Ok_With_Updated_Entity_When_Valid_Category_Id()
  {
    var categoriesMock = CategoryFixtures.GetCategories();
    var contextMock = new MockHttpContext(userIdentity);
    CategoryController sut = new CategoryController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    categoryServiceMock.Setup(x => x.GetByIdAsync(userIdentity.UserId, categoriesMock[0].Id)).ReturnsAsync(() => categoriesMock[0]);
    categoryServiceMock.Setup(x => x.UpdateAsync(It.IsAny<UserData>(), It.IsAny<CategoryDTO>(), It.IsAny<CategoryDTO>())).ReturnsAsync(() => categoriesMock[0]);
    applicationServiceMock.Setup(x => x.Category).Returns(categoryServiceMock.Object);
    var result = await sut.AddOrUpdate(categoriesMock[0]);
    var objectResult = Assert.IsType<OkObjectResult>(result);
    var resultData = Assert.IsType<AddOrUpdateResult<CategoryDTO>>(objectResult.Value);
    Assert.Equal(false, resultData.New);
    Assert.Same(categoriesMock[0], resultData.Entity);
  }
  [Fact]
  public async void AddOrUpdate_Should_Return_NotFound_With_Invalid_Category_Id()
  {
    var categoriesMock = CategoryFixtures.GetCategories();
    var contextMock = new MockHttpContext();
    CategoryController sut = new CategoryController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    categoryServiceMock.Setup(x => x.GetByIdAsync(userIdentity.UserId, It.IsAny<string>())).ReturnsAsync(() => null);
    applicationServiceMock.Setup(x => x.Category).Returns(categoryServiceMock.Object);

    var result = await sut.AddOrUpdate(categoriesMock[0]);
    var objectResult = Assert.IsAssignableFrom<NotFoundObjectResult>(result);
    Assert.Equal($"Category Id: {categoriesMock[0].Id} not found", objectResult.Value);
  }
  [Fact]
  public async void AddOrUpdate_Should_Return_Ok_With_No_Category_Id()
  {
    var newCategoryId = Guid.NewGuid().ToString();
    var newCategory = new CategoryDTO
    {
      Name = "School",
      Id = null
    };
    var contextMock = new MockHttpContext(userIdentity);
    CategoryController sut = new CategoryController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    categoryServiceMock.Setup(x => x.AddAsync(It.IsAny<UserData>(), It.IsAny<CategoryDTO>())).ReturnsAsync(() =>
    {
      newCategory.Id = newCategoryId;
      return newCategory;
    });
    applicationServiceMock.Setup(x => x.Category).Returns(categoryServiceMock.Object);

    var result = await sut.AddOrUpdate(newCategory);
    var objectResult = Assert.IsAssignableFrom<OkObjectResult>(result);
    var value = Assert.IsAssignableFrom<AddOrUpdateResult<CategoryDTO>>(objectResult.Value);
    Assert.Equal(true, value.New);
    Assert.Equal(newCategoryId, value.Entity.Id);
  }
  [Fact]
  public async void Remove_Should_Return_Ok_With_Valid_Category_Id()
  {
    var categoryMock = CategoryFixtures.GetCategories()[0];
    var contextMock = new MockHttpContext(userIdentity);
    CategoryController sut = new CategoryController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    categoryServiceMock.Setup(x => x.GetByIdAsync(It.IsAny<string>(), categoryMock.Id)).ReturnsAsync(() => categoryMock);
    categoryServiceMock.Setup(x => x.RemoveAsync(It.IsAny<UserData>(), categoryMock));
    applicationServiceMock.Setup(x => x.Category).Returns(categoryServiceMock.Object);

    var result = await sut.Remove(categoryMock.Id);
    var objectResult = Assert.IsAssignableFrom<OkObjectResult>(result);
    var value = Assert.IsAssignableFrom<string>(objectResult.Value);
  }
  [Fact]
  public async void Remove_Should_Return_NotFound_With_Invalid_Category_Id()
  {
    var categoryMock = CategoryFixtures.GetCategories()[0];
    var contextMock = new MockHttpContext(userIdentity);
    CategoryController sut = new CategoryController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    categoryServiceMock.Setup(x => x.GetByIdAsync(It.IsAny<string>(), categoryMock.Id)).ReturnsAsync(() => null);
    applicationServiceMock.Setup(x => x.Category).Returns(categoryServiceMock.Object);

    var result = await sut.Remove(categoryMock.Id);
    var objectResult = Assert.IsAssignableFrom<NotFoundObjectResult>(result);
    Assert.Equal($"Category Id: {categoryMock.Id} not found", objectResult.Value);
  }
}