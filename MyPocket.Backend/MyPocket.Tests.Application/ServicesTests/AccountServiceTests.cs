using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Moq;
using MyPocket.Application.DTO;
using MyPocket.Application.Services;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;
using MyPocket.Infra.Data.Context;
using MyPocket.Tests.Application.Fixtures;
using Xunit;

namespace MyPocket.Tests.Application;

public class AccountServiceTests
{
  private UserData user;
  private Mock<IAccountRepository> accountRepo = new Mock<IAccountRepository>();
  private Mock<IRepositories> repo = new Mock<IRepositories>();
  public AccountServiceTests()
  {

    user = new UserData
    {
      Email = "jose@gmail.com",
      UserId = "123",
      UserName = "Jose Junior"
    };
  }
  [Fact]
  public async void AddAsync_Should_Return_Account_When_Success()
  {
    //Given
    var accountDTO = new AccountDTO
    {
      Name = "new account"
    };
    var account = new Account
    {
      Name = "new account",
      Id = Guid.NewGuid()
    };
    accountRepo.Setup(x => x.Add(It.IsAny<Account>())).Returns(account);
    repo.Setup(x => x.Account).Returns(accountRepo.Object);
    repo.Setup(x => x.SaveAsync());
    AccountService sut = new AccountService(repo.Object);
    //When
    var result = await sut.AddAsync(user, accountDTO);
    //Then
    Assert.Equal(account.Name, result.Name);
    Assert.Equal(account.Id, result.Id);
  }
  [Fact]
  public async void AddAsync_Should_Throw_When_Repo_Error()
  {
    //Given
    var accountDTO = new AccountDTO
    {
      Name = "new account"
    };
    var account = new Account
    {
      Name = "new account",
      Id = Guid.NewGuid()
    };
    accountRepo.Setup(x => x.Add(It.IsAny<Account>())).Returns(account);
    repo.Setup(x => x.Account).Returns(accountRepo.Object);
    repo.Setup(x => x.SaveAsync()).Throws(new Exception());
    AccountService sut = new AccountService(repo.Object);
    await Assert.ThrowsAsync<Exception>(() => sut.AddAsync(user, accountDTO));
  }
  [Fact]
  public void GetAll_Should_Return_Account_List_When_Success()
  {
    //Given
    var accountsMock = AccountFixtures.GetAccounts();
    accountRepo.Setup(x => x.Get(It.IsAny<Expression<Func<Account, bool>>>(), null)).Returns(accountsMock);
    repo.Setup(x => x.Account).Returns(accountRepo.Object);
    AccountService sut = new AccountService(repo.Object);
    //When
    var result = sut.GetAll(user.UserId);
    //Then
    Assert.IsAssignableFrom<List<AccountDTO>>(result);
    Assert.Equal(accountsMock.Count, result.Count);
  }
  [Fact]
  public void GetAll_Should_Throw_Exception_When_Repo_Error()
  {
    //Given
    var accountsMock = AccountFixtures.GetAccounts();
    accountRepo.Setup(x => x.Get(It.IsAny<Expression<Func<Account, bool>>>(), null)).Throws(new Exception());
    repo.Setup(x => x.Account).Returns(accountRepo.Object);
    AccountService sut = new AccountService(repo.Object);
    //When
    Assert.Throws<Exception>(() => sut.GetAll(user.UserId));
  }
  [Fact]
  public async void GetByIdAsync_Should_Throw_Exception_When_Repo_Error()
  {
    //Given
    var accountMock = AccountFixtures.GetAccountsDTO()[0];
    var accountsMock = AccountFixtures.GetAccounts();
    accountRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Account, bool>>>(), null)).Throws(new Exception());
    repo.Setup(x => x.Account).Returns(accountRepo.Object);
    AccountService sut = new AccountService(repo.Object);
    //When
    await Assert.ThrowsAsync<Exception>(() => sut.GetByIdAsync(user.UserId, accountMock.Id.Value));
  }
  [Fact]
  public async void GetByIdAsync_Should_Return_Account_When_Success()
  {
    //Given
    var accountMock = AccountFixtures.GetAccounts()[0];
    accountRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Account, bool>>>(), null)).ReturnsAsync(() => accountMock);
    repo.Setup(x => x.Account).Returns(accountRepo.Object);
    AccountService sut = new AccountService(repo.Object);
    //When
    var result = await sut.GetByIdAsync(user.UserId, accountMock.Id);
    //Then
    Assert.IsAssignableFrom<AccountDTO>(result);
    Assert.Equal(accountMock.Id, result.Id);
  }
  [Fact]
  public async void RemoveAsync_Throw_Exeption_When_Invalid_Account()
  {
    //Given
    var accountDTOMock = AccountFixtures.GetAccountsDTO()[0];
    accountRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Account, bool>>>(), null)).ReturnsAsync(() => null);
    repo.Setup(x => x.Account).Returns(accountRepo.Object);
    AccountService sut = new AccountService(repo.Object);
    //When
    var result = await Assert.ThrowsAsync<Exception>(() => sut.RemoveAsync(user, accountDTOMock));
    var innerException = Assert.IsAssignableFrom<NullReferenceException>(result.InnerException);
    Assert.Equal("Invalid account", innerException.Message);
  }
  [Fact]
  public async void RemoveAsync_Throw_Exeption_When_Save_Error()
  {
    //Given
    var accountDTOMock = AccountFixtures.GetAccountsDTO()[0];
    var accountMock = AccountFixtures.GetAccounts()[0];
    accountRepo.Setup(x => x.Remove(It.IsAny<Account>()));
    repo.Setup(x => x.Account).Returns(accountRepo.Object);
    repo.Setup(x => x.SaveAsync()).Throws(new Exception());
    AccountService sut = new AccountService(repo.Object);
    //When
    await Assert.ThrowsAsync<Exception>(() => sut.RemoveAsync(user, accountDTOMock));
  }
  [Fact]
  public async void RemoveRangeAsync_Success()
  {
    //Given
    var ids = AccountFixtures.GetAccounts().Select(c => c.Id).ToList();
    var accountsMock = AccountFixtures.GetAccounts();
    accountRepo.Setup(x => x.Get(It.IsAny<Expression<Func<Account, bool>>>(), null)).Returns(accountsMock);
    accountRepo.Setup(x => x.RemoveRange(It.IsAny<List<Account>>()));
    repo.Setup(x => x.Account).Returns(accountRepo.Object);
    repo.Setup(x => x.SaveAsync());
    AccountService sut = new AccountService(repo.Object);
    //When
    await sut.RemoveRangeAsync(user, ids);
  }
  [Fact]
  public async void RemoveRangeAsync_Throws_Exception_When_Save_Error()
  {
    //Given
    var ids = AccountFixtures.GetAccounts().Select(c => c.Id).ToList();
    var accountsMock = AccountFixtures.GetAccounts();
    accountRepo.Setup(x => x.Get(It.IsAny<Expression<Func<Account, bool>>>(), null)).Returns(accountsMock);
    accountRepo.Setup(x => x.RemoveRange(It.IsAny<List<Account>>()));
    repo.Setup(x => x.Account).Returns(accountRepo.Object);
    repo.Setup(x => x.SaveAsync()).Throws(new Exception());
    AccountService sut = new AccountService(repo.Object);
    //When
    await Assert.ThrowsAsync<Exception>(() => sut.RemoveRangeAsync(user, ids));
  }
  [Fact]
  public async void UpdateAsync_Throws_Exception_When_Save_Error()
  {
    //Given
    var accountMock = AccountFixtures.GetAccounts()[0];
    var accountDTOMock = AccountFixtures.GetAccountsDTO()[0];
    accountRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Account, bool>>>(), null)).ReturnsAsync(() => accountMock);
    accountRepo.Setup(x => x.Update(accountMock, It.IsAny<object>()));
    repo.Setup(x => x.Account).Returns(accountRepo.Object);
    repo.Setup(x => x.SaveAsync()).Throws(new Exception());
    AccountService sut = new AccountService(repo.Object);
    //When
    await Assert.ThrowsAsync<Exception>(() => sut.UpdateAsync(user, accountDTOMock, accountDTOMock));
  }
  [Fact]
  public async void UpdateAsync_Success()
  {
    //Given
    var accountMock = AccountFixtures.GetAccounts()[0];
    var accountDTOMock = AccountFixtures.GetAccountsDTO()[0];
    accountRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Account, bool>>>(), null)).ReturnsAsync(() => accountMock);
    accountRepo.Setup(x => x.Update(accountMock, It.IsAny<object>()));
    repo.Setup(x => x.Account).Returns(accountRepo.Object);
    repo.Setup(x => x.SaveAsync());
    AccountService sut = new AccountService(repo.Object);
    //When
    var result = await sut.UpdateAsync(user, accountDTOMock, accountDTOMock);
    Assert.Same(accountDTOMock, result);
  }
}