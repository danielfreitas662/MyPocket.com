using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Moq;
using MyPocket.Application.DTO;
using MyPocket.Application.Services;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;
using MyPocket.Infra.Data.Context;
using MyPocket.Tests.Application.Fixtures;
using MyPocket.Tests.Application.Mocks;
using Xunit;

namespace MyPocket.Tests.Application;

public class UserServiceTests
{
  private UserData user;
  private Mock<IAccountRepository> accountRepo;
  private Mock<IRepositories> repo;
  private Mock<IUserRepository> userRepoMock;
  private Mock<FakeSignInManager> signInManager;
  private Mock<IConfiguration> config;
  private Mock<FakeUserManager> userManager;
  private List<User> usersMock;
  public UserServiceTests()
  {
    usersMock = UserFixtures.GetUsers();
    userRepoMock = new Mock<IUserRepository>();
    config = new Mock<IConfiguration>();
    userManager = new Mock<FakeUserManager>();
    repo = new Mock<IRepositories>();
    signInManager = new Mock<FakeSignInManager>();
    accountRepo = new Mock<IAccountRepository>();
    user = new UserData
    {
      Email = "jose@gmail.com",
      UserId = "123",
      UserName = "Jose Junior"
    };
  }
  [Fact]
  public void BuildToken_Success()
  {
    // Given
    var userid = Guid.NewGuid().ToString();
    var userData = new User
    {
      Id = userid,
      FirstName = "John",
      LastName = "Lenon",
      Email = "johnlenon@gmail.com",
      UserName = "johnlenon@gmail.com"
    };
    config.Setup(x => x["JWT:key"]).Returns("ndweunfiluwhebifbwefijbnwfnbiuwebfiuewbfwef");
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    var result = sut.BuildToken(userData);
    // Then
    Assert.NotNull(result);
    var token = result;
    var handler = new JwtSecurityTokenHandler();
    var jwtSecurityToken = handler.ReadJwtToken(token);
    var decodedUserId = jwtSecurityToken.Claims.First(claim => claim.Type == "UserID").Value;
    var decodedEmail = jwtSecurityToken.Claims.First(claim => claim.Type == "Email").Value;
    Assert.Equal(userid, decodedUserId);
    Assert.Equal(userData.Email, decodedEmail);
  }
  [Fact]
  public void BuildToken_Throws_Exception_By_Config_Error()
  {
    // Given
    var userid = Guid.NewGuid().ToString();
    var userData = new User
    {
      Id = userid,
      FirstName = "John",
      LastName = "Lenon",
      Email = "johnlenon@gmail.com",
      UserName = "johnlenon@gmail.com"
    };
    config.Setup(x => x["JWT:key"]).Throws(new Exception());
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    Assert.Throws<Exception>(() => sut.BuildToken(userData));
    // Then
  }
  [Fact]
  public void BuildToken_Throws_Exception_By_GetBytes_Error()
  {
    // Given
    Mock<Encoding> encodingMock = new Mock<Encoding>();
    encodingMock.Setup(x => x.GetBytes(It.IsAny<string>())).Throws(new Exception());
    var userid = Guid.NewGuid().ToString();
    var userData = new User
    {
      Id = userid,
      FirstName = "John",
      LastName = "Lenon",
      Email = "johnlenon@gmail.com",
      UserName = "johnlenon@gmail.com"
    };
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    Assert.Throws<Exception>(() => sut.BuildToken(userData));
    // Then
  }
  [Fact]
  public async void AuthenticateAsync_Invalid_UserName_Returns_Success_False_With_Error_Message()
  {
    // Given
    var loginRequestModel = new LoginModel
    {
      Password = "123",
      Email = "test@gmail.com"
    };
    userRepoMock.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<User, bool>>>(), null)).ReturnsAsync(() => null);
    repo.Setup(x => x.User).Returns(userRepoMock.Object);
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    var result = await sut.AuthenticateAsync(loginRequestModel);
    // Then
    Assert.Equal(false, result.Success);
    Assert.Equal("Invalid e-mail/password", result.Message);
    Assert.Equal(string.Empty, result.Token);
  }
  [Fact]
  public async void AuthenticateAsync_Valid_UserName_Wrong_Password_Returns_Success_False_With_Error_Message()
  {
    // Given
    var loginRequestModel = new LoginModel
    {
      Password = "123",
      Email = "test@gmail.com"
    };
    userRepoMock.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<User, bool>>>(), null)).ReturnsAsync(() => usersMock[0]);
    signInManager.Setup(x => x.CheckPasswordSignInAsync(It.IsAny<User>(), It.IsAny<string>(), It.IsAny<bool>())).ReturnsAsync(() => SignInResult.Failed);
    repo.Setup(x => x.User).Returns(userRepoMock.Object);
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    var result = await sut.AuthenticateAsync(loginRequestModel);
    // Then
    Assert.Equal(false, result.Success);
    Assert.Equal("Invalid e-mail/password", result.Message);
    Assert.Equal(string.Empty, result.Token);
  }
  [Fact]
  public async void AuthenticateAsync_Throws_When_Repository_Fails()
  {
    // Given
    var loginRequestModel = new LoginModel
    {
      Password = "123",
      Email = "test@gmail.com"
    };
    userRepoMock.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<User, bool>>>(), null)).ThrowsAsync(new Exception());
    repo.Setup(x => x.User).Returns(userRepoMock.Object);
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    await Assert.ThrowsAsync<Exception>(() => sut.AuthenticateAsync(loginRequestModel));
  }
  [Fact]
  public async void AuthenticateAsync_Valid_UserName_Correct_Password_Returns_Success_False_With_Error_Message()
  {
    // Given
    var loginRequestModel = new LoginModel
    {
      Password = "123",
      Email = "test@gmail.com"
    };
    userRepoMock.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<User, bool>>>(), null)).ReturnsAsync(() => usersMock[0]);
    signInManager.Setup(x => x.CheckPasswordSignInAsync(It.IsAny<User>(), It.IsAny<string>(), It.IsAny<bool>())).ReturnsAsync(() => SignInResult.Success);
    config.Setup(x => x["JWT:key"]).Returns("ndweunfiluwhebifbwefijbnwfnbiuwebfdfederfrfiuewbfwef");
    repo.Setup(x => x.User).Returns(userRepoMock.Object);
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    var result = await sut.AuthenticateAsync(loginRequestModel);
    // Then
    Assert.Equal(true, result.Success);
    Assert.Equal("User successfully signed in", result.Message);
    Assert.NotNull(result.Token);
  }
  [Fact]
  public async void RegisterAsync_Success_Return_Success_True_With_User_And_Message()
  {
    // Given
    var userData = new User
    {
      FirstName = "John",
      LastName = "Lenon",
      Email = "johnlenon@gmail.com",
      UserName = "johnlenon@gmail.com"
    };
    var userDTO = new UserDTO
    {
      FirstName = "John",
      LastName = "Lenon",
      Email = "johnlenon@gmail.com",
      Password = "123"
    };
    userManager.Setup(x => x.CreateAsync(It.IsAny<User>(), userDTO.Password)).ReturnsAsync(() => IdentityResult.Success);
    userRepoMock.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<User, bool>>>(), null)).ReturnsAsync(() => usersMock[0]);
    repo.Setup(x => x.User).Returns(userRepoMock.Object);
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    var result = await sut.RegisterAsync(userDTO);
    // Then
    Assert.Equal(true, result.Success);
    Assert.Equal("User successfully registered", result.Message);
    Assert.NotNull(result.User);
  }
  [Fact]
  public async void RegisterAsync_User_Create_Fails_Return_Success_False_With_Message()
  {
    // Given
    var userData = new User
    {
      FirstName = "John",
      LastName = "Lenon",
      Email = "johnlenon@gmail.com",
      UserName = "johnlenon@gmail.com"
    };
    var userDTO = new UserDTO
    {
      FirstName = "John",
      LastName = "Lenon",
      Email = "johnlenon@gmail.com",
      Password = "123"
    };
    userManager.Setup(x => x.CreateAsync(It.IsAny<User>(), userDTO.Password)).ReturnsAsync(() => IdentityResult.Failed(new IdentityError { Code = "123", Description = "Error" }));
    userRepoMock.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<User, bool>>>(), null)).ReturnsAsync(() => usersMock[0]);
    repo.Setup(x => x.User).Returns(userRepoMock.Object);
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    var result = await sut.RegisterAsync(userDTO);
    // Then
    Assert.Equal(false, result.Success);
    Assert.Equal("Error", result.Message);
    Assert.Null(result.User);
  }
  [Fact]
  public async void RegisterAsync_User_Create_Throws()
  {
    // Given
    var userData = new User
    {
      FirstName = "John",
      LastName = "Lenon",
      Email = "johnlenon@gmail.com",
      UserName = "johnlenon@gmail.com"
    };
    var userDTO = new UserDTO
    {
      FirstName = "John",
      LastName = "Lenon",
      Email = "johnlenon@gmail.com",
      Password = "123"
    };
    userManager.Setup(x => x.CreateAsync(It.IsAny<User>(), userDTO.Password)).ThrowsAsync(new Exception());
    repo.Setup(x => x.User).Returns(userRepoMock.Object);
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    await Assert.ThrowsAsync<Exception>(() => sut.RegisterAsync(userDTO));
  }
  [Fact]
  public async void RegisterAsync_User_Repository_Throws()
  {
    // Given
    var userData = new User
    {
      FirstName = "John",
      LastName = "Lenon",
      Email = "johnlenon@gmail.com",
      UserName = "johnlenon@gmail.com"
    };
    var userDTO = new UserDTO
    {
      FirstName = "John",
      LastName = "Lenon",
      Email = "johnlenon@gmail.com",
      Password = "123"
    };
    userManager.Setup(x => x.CreateAsync(It.IsAny<User>(), userDTO.Password)).ReturnsAsync(() => IdentityResult.Success);
    userRepoMock.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<User, bool>>>(), null)).ThrowsAsync(new Exception());
    repo.Setup(x => x.User).Returns(userRepoMock.Object);
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    await Assert.ThrowsAsync<Exception>(() => sut.RegisterAsync(userDTO));
  }
  [Fact]
  public async void ResetPasswordAsync_Success()
  {
    // Given
    var data = new ResetPasswordRequestModel
    {
      NewPassword = "123",
      Code = "123",
      Email = "email@email.com"
    };
    userRepoMock.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<User, bool>>>(), null)).ReturnsAsync(() => usersMock[0]);
    userManager.Setup(x => x.ResetPasswordAsync(It.IsAny<User>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(() => IdentityResult.Success);
    repo.Setup(x => x.User).Returns(userRepoMock.Object);
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    var result = await sut.ResetPasswordAsync(data);
    // Then
    Assert.Equal(true, result.Success);
    Assert.Equal("Password reset success", result.Message);
  }
  [Fact]
  public async void ResetPasswordAsync_Throws_When_Invalid_User()
  {
    // Given
    var data = new ResetPasswordRequestModel
    {
      NewPassword = "123",
      Code = "123",
      Email = "email@email.com"
    };
    userRepoMock.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<User, bool>>>(), null)).ReturnsAsync(() => null);
    repo.Setup(x => x.User).Returns(userRepoMock.Object);
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    var exception = await Assert.ThrowsAsync<Exception>(() => sut.ResetPasswordAsync(data));
    var innerException = Assert.IsAssignableFrom<NullReferenceException>(exception.InnerException);
    Assert.Equal("User not found", innerException.Message);
  }
  [Fact]
  public async void ResetPasswordAsync_Throws_When_Reset_Fails()
  {
    // Given
    var data = new ResetPasswordRequestModel
    {
      NewPassword = "123",
      Code = "123",
      Email = "email@email.com"
    };
    userRepoMock.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<User, bool>>>(), null)).ReturnsAsync(() => usersMock[0]);
    userManager.Setup(x => x.ResetPasswordAsync(It.IsAny<User>(), It.IsAny<string>(), It.IsAny<string>())).ThrowsAsync(new Exception());
    repo.Setup(x => x.User).Returns(userRepoMock.Object);
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    await Assert.ThrowsAsync<Exception>(() => sut.ResetPasswordAsync(data));
  }
  [Fact]
  public async void ForgotPassword_Throws_When_Invalid_User()
  {
    // Given
    var data = new ForgotPasswordRequestModel
    {
      Email = "email@email.com"
    };
    userRepoMock.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<User, bool>>>(), null)).ReturnsAsync(() => null);
    repo.Setup(x => x.User).Returns(userRepoMock.Object);
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    var exception = await Assert.ThrowsAsync<Exception>(() => sut.ForgotPasswordAsync(data));
    var innerException = Assert.IsAssignableFrom<NullReferenceException>(exception.InnerException);
    Assert.Equal("Invalid user", innerException.Message);
  }
  [Fact]
  public async void ForgotPassword_Throws_When_Token_Generation_Fails()
  {
    // Given
    var data = new ForgotPasswordRequestModel
    {
      Email = "email@email.com"
    };
    userRepoMock.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<User, bool>>>(), null)).ReturnsAsync(() => usersMock[0]);
    userManager.Setup(x => x.GeneratePasswordResetTokenAsync(It.IsAny<User>())).ThrowsAsync(new Exception());
    repo.Setup(x => x.User).Returns(userRepoMock.Object);
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    var exception = await Assert.ThrowsAsync<Exception>(() => sut.ForgotPasswordAsync(data));
  }
  [Fact]
  public async void ForgotPassword_Success_Return_Token()
  {
    // Given
    var data = new ForgotPasswordRequestModel
    {
      Email = "email@email.com"
    };
    userRepoMock.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<User, bool>>>(), null)).ReturnsAsync(() => usersMock[0]);
    userManager.Setup(x => x.GeneratePasswordResetTokenAsync(It.IsAny<User>())).ReturnsAsync(() => "123");
    repo.Setup(x => x.User).Returns(userRepoMock.Object);
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    var result = await sut.ForgotPasswordAsync(data);
    Assert.Equal("123", result);
  }
  [Fact]
  public async void ChangePasswordAsync_Success_Return_Success_With_Message()
  {
    // Given
    var data = new ChangePasswordRequestModel
    {
      Email = "email@email.com",
      OldPassword = "123",
      NewPassword = "321"
    };
    userRepoMock.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<User, bool>>>(), null)).ReturnsAsync(() => usersMock[0]);
    userManager.Setup(x => x.ChangePasswordAsync(It.IsAny<User>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(() => IdentityResult.Success);
    repo.Setup(x => x.User).Returns(userRepoMock.Object);
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    var result = await sut.ChangePasswordAsync(data);
    Assert.Equal(true, result.Success);
    Assert.Equal("Password successfully changed", result.Message);
  }
  [Fact]
  public async void ChangePasswordAsync_Change_Password_Fails_Return_Success_False_With_Message()
  {
    // Given
    var data = new ChangePasswordRequestModel
    {
      Email = "email@email.com",
      OldPassword = "123",
      NewPassword = "321"
    };
    userRepoMock.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<User, bool>>>(), null)).ReturnsAsync(() => usersMock[0]);
    userManager.Setup(x => x.ChangePasswordAsync(It.IsAny<User>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(() => IdentityResult.Failed(new IdentityError { Code = "123", Description = "Error" }));
    repo.Setup(x => x.User).Returns(userRepoMock.Object);
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    var result = await sut.ChangePasswordAsync(data);
    Assert.Equal(false, result.Success);
    Assert.Equal("Error", result.Message);
  }
  [Fact]
  public async void ChangePasswordAsync_Throws_When_Invalid_User()
  {
    // Given
    var data = new ChangePasswordRequestModel
    {
      Email = "email@email.com",
      OldPassword = "123",
      NewPassword = "321"
    };
    userRepoMock.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<User, bool>>>(), null)).ReturnsAsync(() => null);
    repo.Setup(x => x.User).Returns(userRepoMock.Object);
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    var exception = await Assert.ThrowsAsync<Exception>(() => sut.ChangePasswordAsync(data));
    var innerException = Assert.IsAssignableFrom<NullReferenceException>(exception.InnerException);
    Assert.Equal("Invalid user", innerException.Message);
  }
  [Fact]
  public async void ChangePasswordAsync_Throws_When_Change_Fails()
  {
    // Given
    var data = new ChangePasswordRequestModel
    {
      Email = "email@email.com",
      OldPassword = "123",
      NewPassword = "321"
    };
    userRepoMock.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<User, bool>>>(), null)).ReturnsAsync(() => usersMock[0]);
    userManager.Setup(x => x.ChangePasswordAsync(It.IsAny<User>(), It.IsAny<string>(), It.IsAny<string>())).ThrowsAsync(new Exception());
    repo.Setup(x => x.User).Returns(userRepoMock.Object);
    UserService sut = new UserService(repo.Object, signInManager.Object, config.Object, userManager.Object);
    // When
    await Assert.ThrowsAsync<Exception>(() => sut.ChangePasswordAsync(data));
  }
}