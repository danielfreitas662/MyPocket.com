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

public class UserControllerTests
{
  private Mock<IApplicationService> applicationServiceMock = new Mock<IApplicationService>();
  private Mock<IUserService> userServiceMock = new Mock<IUserService>();
  private UserData userIdentity;
  public UserControllerTests()
  {
    userIdentity = new UserData
    {
      UserId = "123",
      UserName = "Daniel Robson",
      Email = "danielrobson@gmail.com"
    };
  }
  [Fact]
  public async void Authenticate_Should_Return_Ok_With_Token_When_Valid_User()
  {
    // Given
    var userMock = UserFixtures.GetUsers()[0];
    var data = new LoginModel
    {
      Email = userMock.Email,
      Password = "123"
    };
    var loginResult = new LoginResultModel
    {
      Success = true,
      Message = "",
      Token = "123"
    };
    var contextMock = new MockHttpContext();
    UserController sut = new UserController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    userServiceMock.Setup(x => x.AuthenticateAsync(data)).ReturnsAsync(() => loginResult);
    applicationServiceMock.Setup(x => x.User).Returns(userServiceMock.Object);
    // When
    var result = await sut.Authenticate(data);
    // Then
    var objectResult = Assert.IsAssignableFrom<OkObjectResult>(result);
    var resultData = Assert.IsAssignableFrom<LoginResultModel>(objectResult.Value);
    Assert.Equal(loginResult.Token, resultData.Token);
  }
  [Fact]
  public async void Authenticate_Should_Return_BadRequest_With_Message_When_Invalid_User()
  {
    // Given
    var userMock = UserFixtures.GetUsers()[0];
    var data = new LoginModel
    {
      Email = userMock.Email,
      Password = "123"
    };
    var loginResult = new LoginResultModel
    {
      Success = false,
      Message = "Invalid User",
      Token = ""
    };
    var contextMock = new MockHttpContext();
    UserController sut = new UserController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    userServiceMock.Setup(x => x.AuthenticateAsync(data)).ReturnsAsync(() => loginResult);
    applicationServiceMock.Setup(x => x.User).Returns(userServiceMock.Object);
    // When
    var result = await sut.Authenticate(data);
    // Then
    var objectResult = Assert.IsAssignableFrom<BadRequestObjectResult>(result);
    var resultData = Assert.IsAssignableFrom<LoginResultModel>(objectResult.Value);
    Assert.Equal(loginResult.Message, resultData.Message);
  }
  [Fact]
  public async void ChangePassword_Should_Return_Ok_When_Success()
  {
    // Given
    var userMock = UserFixtures.GetUsers()[0];
    var data = new ChangePasswordRequestModel
    {
      Email = userMock.Email,
      OldPassword = "123",
      NewPassword = "321"
    };
    var changePasswordResult = new ChangePasswordResultModel
    {
      Success = true,
      Message = "Done",
    };
    var contextMock = new MockHttpContext();
    UserController sut = new UserController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    userServiceMock.Setup(x => x.ChangePasswordAsync(data)).ReturnsAsync(() => changePasswordResult);
    applicationServiceMock.Setup(x => x.User).Returns(userServiceMock.Object);
    // When
    var result = await sut.ChangePassword(data);
    // Then
    var objectResult = Assert.IsAssignableFrom<OkObjectResult>(result);
    var resultData = Assert.IsAssignableFrom<string>(objectResult.Value);
    Assert.Equal(changePasswordResult.Message, resultData);
  }
  [Fact]
  public async void ChangePassword_Should_Return_BadRequest_When_Not_Success()
  {
    // Given
    var userMock = UserFixtures.GetUsers()[0];
    var data = new ChangePasswordRequestModel
    {
      Email = userMock.Email,
      OldPassword = "123",
      NewPassword = "321"
    };
    var changePasswordResult = new ChangePasswordResultModel
    {
      Success = false,
      Message = "Error",
    };
    var contextMock = new MockHttpContext();
    UserController sut = new UserController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    userServiceMock.Setup(x => x.ChangePasswordAsync(data)).ReturnsAsync(() => changePasswordResult);
    applicationServiceMock.Setup(x => x.User).Returns(userServiceMock.Object);
    // When
    var result = await sut.ChangePassword(data);
    // Then
    var objectResult = Assert.IsAssignableFrom<BadRequestObjectResult>(result);
    var resultData = Assert.IsAssignableFrom<string>(objectResult.Value);
    Assert.Equal(changePasswordResult.Message, resultData);
  }
  [Fact]
  public async void Register_Should_Return_Ok_When_Success()
  {
    // Given
    var userMock = UserFixtures.GetUsers()[0];
    var registerResult = new RegisterResultModel
    {
      Success = true,
      Message = "Done",
    };
    var contextMock = new MockHttpContext();
    UserController sut = new UserController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    userServiceMock.Setup(x => x.RegisterAsync(userMock)).ReturnsAsync(() => registerResult);
    applicationServiceMock.Setup(x => x.User).Returns(userServiceMock.Object);
    // When
    var result = await sut.Register(userMock);
    // Then
    var objectResult = Assert.IsAssignableFrom<OkObjectResult>(result);
    var resultData = Assert.IsAssignableFrom<string>(objectResult.Value);
    Assert.Equal(registerResult.Message, resultData);
  }
  [Fact]
  public async void Register_Should_Return_BadRequest_When_Not_Success()
  {
    // Given
    var userMock = UserFixtures.GetUsers()[0];
    var registerResult = new RegisterResultModel
    {
      Success = false,
      Message = "Error",
    };
    var contextMock = new MockHttpContext();
    UserController sut = new UserController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    userServiceMock.Setup(x => x.RegisterAsync(userMock)).ReturnsAsync(() => registerResult);
    applicationServiceMock.Setup(x => x.User).Returns(userServiceMock.Object);
    // When
    var result = await sut.Register(userMock);
    // Then
    var objectResult = Assert.IsAssignableFrom<BadRequestObjectResult>(result);
    var resultData = Assert.IsAssignableFrom<string>(objectResult.Value);
    Assert.Equal(registerResult.Message, resultData);
  }
  [Fact]
  public async void ForgotPassword_Should_Return_Ok()
  {
    // Given
    var userMock = UserFixtures.GetUsers()[0];
    var data = new ForgotPasswordRequestModel
    {
      Email = userMock.Email
    };
    var contextMock = new MockHttpContext();
    UserController sut = new UserController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    userServiceMock.Setup(x => x.ForgotPasswordAsync(data));
    applicationServiceMock.Setup(x => x.User).Returns(userServiceMock.Object);
    // When
    var result = await sut.ForgotPassword(data);
    // Then
    var objectResult = Assert.IsAssignableFrom<OkObjectResult>(result);
    var resultData = Assert.IsAssignableFrom<string>(objectResult.Value);
    Assert.Same("Instructions have been sent to the informed e-mail", resultData);
  }
  [Fact]
  public async void ResetPassword_Should_Return_BadRequest_When_Not_Success()
  {
    // Given
    var userMock = UserFixtures.GetUsers()[0];
    var data = new ResetPasswordRequestModel
    {
      Email = userMock.Email,
      Code = "123"
    };
    var registerResult = new ResetPasswordResultModel
    {
      Success = false,
      Message = "Error",
    };
    var contextMock = new MockHttpContext();
    UserController sut = new UserController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    userServiceMock.Setup(x => x.ResetPasswordAsync(data)).ReturnsAsync(() => registerResult);
    applicationServiceMock.Setup(x => x.User).Returns(userServiceMock.Object);
    // When
    var result = await sut.ResetPassword(data);
    // Then
    var objectResult = Assert.IsAssignableFrom<BadRequestObjectResult>(result);
    var resultData = Assert.IsAssignableFrom<string>(objectResult.Value);
    Assert.Equal(registerResult.Message, resultData);
  }
  [Fact]
  public async void ResetPassword_Should_Return_Ok_When_Success()
  {
    // Given
    var userMock = UserFixtures.GetUsers()[0];
    var data = new ResetPasswordRequestModel
    {
      Email = userMock.Email,
      Code = "123"
    };
    var registerResult = new ResetPasswordResultModel
    {
      Success = true,
      Message = "Done",
    };
    var contextMock = new MockHttpContext();
    UserController sut = new UserController(applicationServiceMock.Object);
    sut.ControllerContext.HttpContext = contextMock.context;
    userServiceMock.Setup(x => x.ResetPasswordAsync(data)).ReturnsAsync(() => registerResult);
    applicationServiceMock.Setup(x => x.User).Returns(userServiceMock.Object);
    // When
    var result = await sut.ResetPassword(data);
    // Then
    var objectResult = Assert.IsAssignableFrom<OkObjectResult>(result);
    var resultData = Assert.IsAssignableFrom<string>(objectResult.Value);
    Assert.Equal(registerResult.Message, resultData);
  }
}