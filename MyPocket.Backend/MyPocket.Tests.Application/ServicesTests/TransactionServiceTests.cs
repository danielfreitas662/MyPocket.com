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

public class TransactionServiceTests
{
  private UserData user;
  private Mock<ICategoryRepository> categoryRepo = new Mock<ICategoryRepository>();
  private Mock<IAccountRepository> accountRepo = new Mock<IAccountRepository>();
  private Mock<ITransactionRepository> transactionRepo = new Mock<ITransactionRepository>();
  private List<Category> categoriesMock;
  private List<Account> accountsMock;
  private List<User> usersMock;
  private List<Transaction> transactionsMock;
  private Mock<IRepositories> repo = new Mock<IRepositories>();
  public TransactionServiceTests()
  {
    categoriesMock = CategoryFixtures.GetCategories();
    accountsMock = AccountFixtures.GetAccounts();
    usersMock = UserFixtures.GetUsers();
    transactionsMock = TransactionFixtures.GetTransactions();
    user = new UserData
    {
      Email = "jose@gmail.com",
      UserId = "123",
      UserName = "Jose Junior"
    };
  }
  [Fact]
  public async void AddAsync_Should_Return_Transaction_When_Success()
  {
    //Given
    var userFixture = UserFixtures.GetUsers();
    var categoryFixture = CategoryFixtures.GetCategories();
    var accountFixture = AccountFixtures.GetAccounts();
    var transactionDTO = new TransactionDTO
    {
      Description = "School",
      Amount = 1000,
      Date = DateTime.Today,
      UserId = userFixture[0].Id,
      CategoryId = categoryFixture[1].Id,
      AccountId = accountFixture[0].Id,
      Category = categoryFixture[1].Name,
      Account = accountFixture[0].Name
    };
    var transaction = new Transaction
    {
      Id = Guid.NewGuid().ToString(),
      Description = "School",
      Amount = 1000,
      Date = DateTime.Today,
      UserId = userFixture[0].Id,
      CategoryId = categoryFixture[1].Id,
      AccountId = accountFixture[0].Id,
      Category = categoryFixture[1],
      Account = accountFixture[0]
    };
    categoryRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Category, bool>>>(), null)).ReturnsAsync(() => categoryFixture[1]);
    accountRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Account, bool>>>(), null)).ReturnsAsync(() => accountFixture[0]);
    transactionRepo.Setup(x => x.Add(It.IsAny<Transaction>())).Returns(transaction);
    repo.Setup(x => x.Category).Returns(categoryRepo.Object);
    repo.Setup(x => x.Account).Returns(accountRepo.Object);
    repo.Setup(x => x.Transaction).Returns(transactionRepo.Object);
    repo.Setup(x => x.SaveAsync());
    TransactionService sut = new TransactionService(repo.Object);
    //When
    var result = await sut.AddAsync(user, transactionDTO);
    //Then
    Assert.Equal(transaction.Id, result.Id);
  }
  [Fact]
  public async void AddAsync_Should_Throw_When_Repo_Error()
  {
    //Given
    var userFixture = UserFixtures.GetUsers();
    var categoryFixture = CategoryFixtures.GetCategories();
    var accountFixture = AccountFixtures.GetAccounts();
    var transactionDTO = new TransactionDTO
    {
      Description = "School",
      Amount = 1000,
      Date = DateTime.Today,
      UserId = userFixture[0].Id,
      CategoryId = categoryFixture[1].Id,
      AccountId = accountFixture[0].Id,
      Category = categoryFixture[1].Name,
      Account = accountFixture[0].Name
    };
    var transaction = new Transaction
    {
      Id = Guid.NewGuid().ToString(),
      Description = "School",
      Amount = 1000,
      Date = DateTime.Today,
      UserId = userFixture[0].Id,
      CategoryId = categoryFixture[1].Id,
      AccountId = accountFixture[0].Id,
      Category = categoryFixture[1],
      Account = accountFixture[0]
    };
    transactionRepo.Setup(x => x.Add(It.IsAny<Transaction>())).Returns(transaction);
    repo.Setup(x => x.Transaction).Returns(transactionRepo.Object);
    repo.Setup(x => x.SaveAsync()).Throws(new Exception());
    TransactionService sut = new TransactionService(repo.Object);
    await Assert.ThrowsAsync<Exception>(() => sut.AddAsync(user, transactionDTO));
  }
  [Fact]
  public void GetAll_Should_Return_Transaction_List_When_Success()
  {
    //Given
    categoryRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Category, bool>>>(), null)).ReturnsAsync(() => categoriesMock[1]);
    accountRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Account, bool>>>(), null)).ReturnsAsync(() => accountsMock[0]);
    transactionRepo.Setup(x => x.Get(It.IsAny<Expression<Func<Transaction, bool>>>(), It.IsAny<Func<IQueryable<Transaction>, Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Transaction, object>>>())).Returns(transactionsMock);
    repo.Setup(x => x.Category).Returns(categoryRepo.Object);
    repo.Setup(x => x.Account).Returns(accountRepo.Object);
    repo.Setup(x => x.Transaction).Returns(transactionRepo.Object);
    TransactionService sut = new TransactionService(repo.Object);
    //When
    var result = sut.GetAll(user.UserId);
    //Then
    Assert.IsAssignableFrom<List<TransactionDTO>>(result);
    Assert.Equal(transactionsMock.Count, result.Count);
  }
  [Fact]
  public void GetAll_Should_Throw_Exception_When_Repo_Error()
  {
    var categoryFixture = CategoryFixtures.GetCategories();
    var accountFixture = AccountFixtures.GetAccounts();
    //Given
    var transactionsMock = TransactionFixtures.GetTransactions();
    categoryRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Category, bool>>>(), null)).ReturnsAsync(() => categoryFixture[1]);
    accountRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Account, bool>>>(), null)).ReturnsAsync(() => accountFixture[0]);
    transactionRepo.Setup(x => x.Get(It.IsAny<Expression<Func<Transaction, bool>>>(), It.IsAny<Func<IQueryable<Transaction>, Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Transaction, object>>>())).Throws(new Exception());
    repo.Setup(x => x.Category).Returns(categoryRepo.Object);
    repo.Setup(x => x.Account).Returns(accountRepo.Object);
    repo.Setup(x => x.Transaction).Returns(transactionRepo.Object);
    TransactionService sut = new TransactionService(repo.Object);
    //When
    Assert.Throws<Exception>(() => sut.GetAll(user.UserId));
  }
  [Fact]
  public async void GetByIdAsync_Should_Throw_Exception_When_Repo_Error()
  {
    //Given
    var transactionMock = TransactionFixtures.GetTransactionsDTO()[0];
    var transactionsMock = TransactionFixtures.GetTransactions();
    transactionRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Transaction, bool>>>(), It.IsAny<Func<IQueryable<Transaction>, Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Transaction, object>>>())).Throws(new Exception());
    repo.Setup(x => x.Transaction).Returns(transactionRepo.Object);
    TransactionService sut = new TransactionService(repo.Object);
    //When
    await Assert.ThrowsAsync<Exception>(() => sut.GetByIdAsync(user.UserId, transactionMock.Id));
  }
  [Fact]
  public async void GetByIdAsync_Should_Return_Transaction_When_Success()
  {
    //Given
    var transactionMock = TransactionFixtures.GetTransactions()[0];
    transactionRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Transaction, bool>>>(), It.IsAny<Func<IQueryable<Transaction>, Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Transaction, object>>>())).ReturnsAsync(() => transactionMock);
    repo.Setup(x => x.Transaction).Returns(transactionRepo.Object);
    TransactionService sut = new TransactionService(repo.Object);
    //When
    var result = await sut.GetByIdAsync(user.UserId, transactionMock.Id);
    //Then
    Assert.IsAssignableFrom<TransactionDTO>(result);
    Assert.Equal(transactionMock.Id, result.Id);
  }

  [Fact]
  public async void RemoveAsync_Throw_Exeption_When_Invalid_Transaction()
  {
    //Given
    var transactionDTOMock = TransactionFixtures.GetTransactionsDTO()[0];
    transactionRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Transaction, bool>>>(), null)).ReturnsAsync(() => null);
    repo.Setup(x => x.Transaction).Returns(transactionRepo.Object);
    TransactionService sut = new TransactionService(repo.Object);
    //When
    var result = await Assert.ThrowsAsync<Exception>(() => sut.RemoveAsync(user, transactionDTOMock));
    var innerException = Assert.IsAssignableFrom<NullReferenceException>(result.InnerException);
    Assert.Equal("Invalid transaction", innerException.Message);
  }
  [Fact]
  public async void RemoveAsync_Throw_Exeption_When_Save_Error()
  {
    //Given
    var transactionDTOMock = TransactionFixtures.GetTransactionsDTO()[0];
    var transactionMock = TransactionFixtures.GetTransactions()[0];
    transactionRepo.Setup(x => x.Remove(It.IsAny<Transaction>()));
    repo.Setup(x => x.Transaction).Returns(transactionRepo.Object);
    repo.Setup(x => x.SaveAsync()).Throws(new Exception());
    TransactionService sut = new TransactionService(repo.Object);
    //When
    await Assert.ThrowsAsync<Exception>(() => sut.RemoveAsync(user, transactionDTOMock));
  }
  [Fact]
  public async void RemoveRangeAsync_Success()
  {
    //Given
    var ids = TransactionFixtures.GetTransactions().Select(c => c.Id).ToList();
    var transactionsMock = TransactionFixtures.GetTransactions();
    transactionRepo.Setup(x => x.Get(It.IsAny<Expression<Func<Transaction, bool>>>(), null)).Returns(transactionsMock);
    transactionRepo.Setup(x => x.RemoveRange(It.IsAny<List<Transaction>>()));
    repo.Setup(x => x.Transaction).Returns(transactionRepo.Object);
    repo.Setup(x => x.SaveAsync());
    TransactionService sut = new TransactionService(repo.Object);
    //When
    await sut.RemoveRangeAsync(user, ids);
  }
  [Fact]
  public async void RemoveRangeAsync_Throws_Exception_When_Save_Error()
  {
    //Given
    var ids = TransactionFixtures.GetTransactions().Select(c => c.Id).ToList();
    var transactionsMock = TransactionFixtures.GetTransactions();
    transactionRepo.Setup(x => x.Get(It.IsAny<Expression<Func<Transaction, bool>>>(), null)).Returns(transactionsMock);
    transactionRepo.Setup(x => x.RemoveRange(It.IsAny<List<Transaction>>()));
    repo.Setup(x => x.Transaction).Returns(transactionRepo.Object);
    repo.Setup(x => x.SaveAsync()).Throws(new Exception());
    TransactionService sut = new TransactionService(repo.Object);
    //When
    await Assert.ThrowsAsync<Exception>(() => sut.RemoveRangeAsync(user, ids));
  }
  [Fact]
  public async void UpdateAsync_Throws_Exception_When_Save_Error()
  {
    //Given
    var transactionMock = TransactionFixtures.GetTransactions()[0];
    var transactionDTOMock = TransactionFixtures.GetTransactionsDTO()[0];
    transactionRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Transaction, bool>>>(), null)).ReturnsAsync(() => transactionMock);
    transactionRepo.Setup(x => x.Update(transactionMock, It.IsAny<object>()));
    repo.Setup(x => x.Transaction).Returns(transactionRepo.Object);
    repo.Setup(x => x.SaveAsync()).Throws(new Exception());
    TransactionService sut = new TransactionService(repo.Object);
    //When
    await Assert.ThrowsAsync<Exception>(() => sut.UpdateAsync(user, transactionDTOMock, transactionDTOMock));
  }
  [Fact]
  public async void UpdateAsync_Success()
  {
    //Given
    var transactionMock = TransactionFixtures.GetTransactions()[0];
    var transactionDTOMock = TransactionFixtures.GetTransactionsDTO()[0];
    transactionRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Transaction, bool>>>(), null)).ReturnsAsync(() => transactionMock);
    transactionRepo.Setup(x => x.Update(transactionMock, It.IsAny<object>()));
    repo.Setup(x => x.Transaction).Returns(transactionRepo.Object);
    repo.Setup(x => x.SaveAsync());
    TransactionService sut = new TransactionService(repo.Object);
    //When
    var result = await sut.UpdateAsync(user, transactionDTOMock, transactionDTOMock);
    Assert.Same(transactionDTOMock, result);
  }
}