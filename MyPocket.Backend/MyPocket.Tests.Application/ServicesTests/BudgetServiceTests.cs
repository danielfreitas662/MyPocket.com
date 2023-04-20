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

public class BudgetServiceTests
{
  private UserData user;
  private Mock<IBudgetRepository> budgetRepo = new Mock<IBudgetRepository>();
  private Mock<ICategoryRepository> categoryRepo = new Mock<ICategoryRepository>();
  private Mock<IRepositories> repo = new Mock<IRepositories>();
  public BudgetServiceTests()
  {
    user = new UserData
    {
      Email = "jose@gmail.com",
      UserId = "123",
      UserName = "Jose Junior"
    };
  }
  [Fact]
  public async void AddAsync_Should_Return_Budget_When_Success()
  {
    //Given
    var categorieMock = CategoryFixtures.GetCategories()[0];
    var budgetDTO = new BudgetDTO
    {
      Amount = 1000,
      Month = DateTime.Today,
    };
    var budget = new Budget
    {
      Month = DateTime.Today,
      Id = Guid.NewGuid().ToString()
    };
    categoryRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Category, bool>>>(), null)).ReturnsAsync(() => categorieMock);
    budgetRepo.Setup(x => x.Add(It.IsAny<Budget>())).Returns(budget);
    repo.Setup(x => x.Budget).Returns(budgetRepo.Object);
    repo.Setup(x => x.Category).Returns(categoryRepo.Object);
    repo.Setup(x => x.SaveAsync());
    BudgetService sut = new BudgetService(repo.Object);
    //When
    var result = await sut.AddAsync(user, budgetDTO);
    //Then
    Assert.Equal(budget.Id, result.Id);
  }
  [Fact]
  public async void AddAsync_Should_Throw_When_Repo_Error()
  {
    //Given
    var budgetDTO = new BudgetDTO
    {
      Amount = 1000,
      Month = DateTime.Today,
    };
    var budget = new Budget
    {
      Month = DateTime.Today,
      Id = Guid.NewGuid().ToString()
    };
    budgetRepo.Setup(x => x.Add(It.IsAny<Budget>())).Returns(budget);
    repo.Setup(x => x.Budget).Returns(budgetRepo.Object);
    repo.Setup(x => x.SaveAsync()).Throws(new Exception());
    BudgetService sut = new BudgetService(repo.Object);
    await Assert.ThrowsAsync<Exception>(() => sut.AddAsync(user, budgetDTO));
  }
  [Fact]
  public void GetAll_Should_Return_Budget_List_When_Success()
  {
    //Given
    var budgetsMock = BudgetFixtures.GetBudgets();
    budgetRepo.Setup(x => x.Get(It.IsAny<Expression<Func<Budget, bool>>>(), It.IsAny<Func<IQueryable<Budget>, Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Budget, object>>>())).Returns(budgetsMock);
    repo.Setup(x => x.Budget).Returns(budgetRepo.Object);
    BudgetService sut = new BudgetService(repo.Object);
    //When
    var result = sut.GetAll(user.UserId);
    //Then
    Assert.IsAssignableFrom<List<BudgetDTO>>(result);
    Assert.Equal(budgetsMock.Count, result.Count);
  }
  [Fact]
  public void GetAll_Should_Throw_Exception_When_Repo_Error()
  {
    //Given
    var budgetsMock = BudgetFixtures.GetBudgets();
    budgetRepo.Setup(x => x.Get(It.IsAny<Expression<Func<Budget, bool>>>(), null)).Throws(new Exception());
    repo.Setup(x => x.Budget).Returns(budgetRepo.Object);
    BudgetService sut = new BudgetService(repo.Object);
    //When
    Assert.Throws<Exception>(() => sut.GetAll(user.UserId));
  }
  [Fact]
  public async void GetByIdAsync_Should_Throw_Exception_When_Repo_Error()
  {
    //Given
    var budgetMock = BudgetFixtures.GetBudgetsDTO()[0];
    var budgetsMock = BudgetFixtures.GetBudgets();
    budgetRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Budget, bool>>>(), It.IsAny<Func<IQueryable<Budget>, Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Budget, object>>>())).Throws(new Exception());
    repo.Setup(x => x.Budget).Returns(budgetRepo.Object);
    BudgetService sut = new BudgetService(repo.Object);
    //When
    await Assert.ThrowsAsync<Exception>(() => sut.GetByIdAsync(user.UserId, budgetMock.Id));
  }
  [Fact]
  public async void GetByIdAsync_Should_Return_Budget_When_Success()
  {
    //Given
    var budgetMock = BudgetFixtures.GetBudgets()[0];
    budgetRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Budget, bool>>>(), It.IsAny<Func<IQueryable<Budget>, Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Budget, object>>>())).ReturnsAsync(() => budgetMock);
    repo.Setup(x => x.Budget).Returns(budgetRepo.Object);
    BudgetService sut = new BudgetService(repo.Object);
    //When
    var result = await sut.GetByIdAsync(user.UserId, budgetMock.Id);
    //Then
    Assert.IsAssignableFrom<BudgetDTO>(result);
    Assert.Equal(budgetMock.Id, result.Id);
  }
  [Fact]
  public async void RemoveAsync_Throw_Exeption_When_Invalid_Budget()
  {
    //Given
    var budgetDTOMock = BudgetFixtures.GetBudgetsDTO()[0];
    budgetRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Budget, bool>>>(), It.IsAny<Func<IQueryable<Budget>, Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Budget, object>>>())).ReturnsAsync(() => null);
    repo.Setup(x => x.Budget).Returns(budgetRepo.Object);
    BudgetService sut = new BudgetService(repo.Object);
    //When
    var result = await Assert.ThrowsAsync<Exception>(() => sut.RemoveAsync(user, budgetDTOMock));
    var innerException = Assert.IsAssignableFrom<NullReferenceException>(result.InnerException);
    Assert.Equal("Invalid Budget", innerException.Message);
  }
  [Fact]
  public async void RemoveAsync_Throw_Exeption_When_Save_Error()
  {
    //Given
    var budgetDTOMock = BudgetFixtures.GetBudgetsDTO()[0];
    var budgetMock = BudgetFixtures.GetBudgets()[0];
    budgetRepo.Setup(x => x.Remove(It.IsAny<Budget>()));
    repo.Setup(x => x.Budget).Returns(budgetRepo.Object);
    repo.Setup(x => x.SaveAsync()).Throws(new Exception());
    BudgetService sut = new BudgetService(repo.Object);
    //When
    await Assert.ThrowsAsync<Exception>(() => sut.RemoveAsync(user, budgetDTOMock));
  }
  [Fact]
  public async void RemoveRangeAsync_Success()
  {
    //Given
    var ids = BudgetFixtures.GetBudgets().Select(c => c.Id).ToList();
    var budgetsMock = BudgetFixtures.GetBudgets();
    budgetRepo.Setup(x => x.Get(It.IsAny<Expression<Func<Budget, bool>>>(), null)).Returns(budgetsMock);
    budgetRepo.Setup(x => x.RemoveRange(It.IsAny<List<Budget>>()));
    repo.Setup(x => x.Budget).Returns(budgetRepo.Object);
    repo.Setup(x => x.SaveAsync());
    BudgetService sut = new BudgetService(repo.Object);
    //When
    await sut.RemoveRangeAsync(user, ids);
  }
  [Fact]
  public async void RemoveRangeAsync_Throws_Exception_When_Save_Error()
  {
    //Given
    var ids = BudgetFixtures.GetBudgets().Select(c => c.Id).ToList();
    var budgetsMock = BudgetFixtures.GetBudgets();
    budgetRepo.Setup(x => x.Get(It.IsAny<Expression<Func<Budget, bool>>>(), null)).Returns(budgetsMock);
    budgetRepo.Setup(x => x.RemoveRange(It.IsAny<List<Budget>>()));
    repo.Setup(x => x.Budget).Returns(budgetRepo.Object);
    repo.Setup(x => x.SaveAsync()).Throws(new Exception());
    BudgetService sut = new BudgetService(repo.Object);
    //When
    await Assert.ThrowsAsync<Exception>(() => sut.RemoveRangeAsync(user, ids));
  }
  [Fact]
  public async void UpdateAsync_Throws_Exception_When_Save_Error()
  {
    //Given
    var budgetMock = BudgetFixtures.GetBudgets()[0];
    var budgetDTOMock = BudgetFixtures.GetBudgetsDTO()[0];
    budgetRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Budget, bool>>>(), null)).ReturnsAsync(() => budgetMock);
    budgetRepo.Setup(x => x.Update(budgetMock, It.IsAny<object>()));
    repo.Setup(x => x.Budget).Returns(budgetRepo.Object);
    repo.Setup(x => x.SaveAsync()).Throws(new Exception());
    BudgetService sut = new BudgetService(repo.Object);
    //When
    await Assert.ThrowsAsync<Exception>(() => sut.UpdateAsync(user, budgetDTOMock, budgetDTOMock));
  }
  [Fact]
  public async void UpdateAsync_Success()
  {
    //Given
    var budgetMock = BudgetFixtures.GetBudgets()[0];
    var budgetDTOMock = BudgetFixtures.GetBudgetsDTO()[0];
    budgetRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Budget, bool>>>(), null)).ReturnsAsync(() => budgetMock);
    budgetRepo.Setup(x => x.Update(budgetMock, It.IsAny<object>()));
    repo.Setup(x => x.Budget).Returns(budgetRepo.Object);
    repo.Setup(x => x.SaveAsync());
    BudgetService sut = new BudgetService(repo.Object);
    //When
    var result = await sut.UpdateAsync(user, budgetDTOMock, budgetDTOMock);
    Assert.Same(budgetDTOMock, result);
  }
}