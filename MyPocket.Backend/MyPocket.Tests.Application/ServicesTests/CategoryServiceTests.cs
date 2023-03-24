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

public class CategoryServiceTests
{
  private UserData user;
  private Mock<ICategoryRepository> categoryRepo = new Mock<ICategoryRepository>();
  private Mock<IRepositories> repo = new Mock<IRepositories>();
  public CategoryServiceTests()
  {

    user = new UserData
    {
      Email = "jose@gmail.com",
      UserId = "123",
      UserName = "Jose Junior"
    };
  }
  [Fact]
  public async void AddAsync_Should_Return_Category_When_Success()
  {
    //Given
    var categoryDTO = new CategoryDTO
    {
      Name = "new category"
    };
    var category = new Category
    {
      Name = "new category",
      Id = Guid.NewGuid()
    };
    categoryRepo.Setup(x => x.Add(It.IsAny<Category>())).Returns(category);
    repo.Setup(x => x.Category).Returns(categoryRepo.Object);
    repo.Setup(x => x.SaveAsync());
    CategoryService sut = new CategoryService(repo.Object);
    //When
    var result = await sut.AddAsync(user, categoryDTO);
    //Then
    Assert.Equal(category.Name, result.Name);
    Assert.Equal(category.Id, result.Id);
  }
  [Fact]
  public async void AddAsync_Should_Throw_When_Repo_Error()
  {
    //Given
    var categoryDTO = new CategoryDTO
    {
      Name = "new category"
    };
    var category = new Category
    {
      Name = "new category",
      Id = Guid.NewGuid()
    };
    categoryRepo.Setup(x => x.Add(It.IsAny<Category>())).Returns(category);
    repo.Setup(x => x.Category).Returns(categoryRepo.Object);
    repo.Setup(x => x.SaveAsync()).Throws(new Exception());
    CategoryService sut = new CategoryService(repo.Object);
    await Assert.ThrowsAsync<Exception>(() => sut.AddAsync(user, categoryDTO));
  }
  [Fact]
  public void GetAll_Should_Return_Category_List_When_Success()
  {
    //Given
    var categoriesMock = CategoryFixtures.GetCategories();
    categoryRepo.Setup(x => x.Get(It.IsAny<Expression<Func<Category, bool>>>(), null)).Returns(categoriesMock);
    repo.Setup(x => x.Category).Returns(categoryRepo.Object);
    CategoryService sut = new CategoryService(repo.Object);
    //When
    var result = sut.GetAll(user.UserId);
    //Then
    Assert.IsAssignableFrom<List<CategoryDTO>>(result);
    Assert.Equal(categoriesMock.Count, result.Count);
  }
  [Fact]
  public void GetAll_Should_Throw_Exception_When_Repo_Error()
  {
    //Given
    var categoriesMock = CategoryFixtures.GetCategories();
    categoryRepo.Setup(x => x.Get(It.IsAny<Expression<Func<Category, bool>>>(), null)).Throws(new Exception());
    repo.Setup(x => x.Category).Returns(categoryRepo.Object);
    CategoryService sut = new CategoryService(repo.Object);
    //When
    Assert.Throws<Exception>(() => sut.GetAll(user.UserId));
  }
  [Fact]
  public async void GetByIdAsync_Should_Throw_Exception_When_Repo_Error()
  {
    //Given
    var categoryMock = CategoryFixtures.GetCategoriesDTO()[0];
    var categoriesMock = CategoryFixtures.GetCategories();
    categoryRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Category, bool>>>(), null)).Throws(new Exception());
    repo.Setup(x => x.Category).Returns(categoryRepo.Object);
    CategoryService sut = new CategoryService(repo.Object);
    //When
    await Assert.ThrowsAsync<Exception>(() => sut.GetByIdAsync(user.UserId, categoryMock.Id.Value));
  }
  [Fact]
  public async void GetByIdAsync_Should_Return_Category_When_Success()
  {
    //Given
    var categoryMock = CategoryFixtures.GetCategories()[0];
    categoryRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Category, bool>>>(), null)).ReturnsAsync(() => categoryMock);
    repo.Setup(x => x.Category).Returns(categoryRepo.Object);
    CategoryService sut = new CategoryService(repo.Object);
    //When
    var result = await sut.GetByIdAsync(user.UserId, categoryMock.Id);
    //Then
    Assert.IsAssignableFrom<CategoryDTO>(result);
    Assert.Equal(categoryMock.Id, result.Id);
  }
  [Fact]
  public async void RemoveAsync_Throw_Exeption_When_Invalid_Category()
  {
    //Given
    var categoryDTOMock = CategoryFixtures.GetCategoriesDTO()[0];
    categoryRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Category, bool>>>(), null)).ReturnsAsync(() => null);
    repo.Setup(x => x.Category).Returns(categoryRepo.Object);
    CategoryService sut = new CategoryService(repo.Object);
    //When
    var result = await Assert.ThrowsAsync<Exception>(() => sut.RemoveAsync(user, categoryDTOMock));
    var innerException = Assert.IsAssignableFrom<NullReferenceException>(result.InnerException);
    Assert.Equal("Invalid category", innerException.Message);
  }
  [Fact]
  public async void RemoveAsync_Throw_Exeption_When_Save_Error()
  {
    //Given
    var categoryDTOMock = CategoryFixtures.GetCategoriesDTO()[0];
    var categoryMock = CategoryFixtures.GetCategories()[0];
    categoryRepo.Setup(x => x.Remove(It.IsAny<Category>()));
    repo.Setup(x => x.Category).Returns(categoryRepo.Object);
    repo.Setup(x => x.SaveAsync()).Throws(new Exception());
    CategoryService sut = new CategoryService(repo.Object);
    //When
    await Assert.ThrowsAsync<Exception>(() => sut.RemoveAsync(user, categoryDTOMock));
  }
  [Fact]
  public async void RemoveRangeAsync_Success()
  {
    //Given
    var ids = CategoryFixtures.GetCategories().Select(c => c.Id).ToList();
    var categoriesMock = CategoryFixtures.GetCategories();
    categoryRepo.Setup(x => x.Get(It.IsAny<Expression<Func<Category, bool>>>(), null)).Returns(categoriesMock);
    categoryRepo.Setup(x => x.RemoveRange(It.IsAny<List<Category>>()));
    repo.Setup(x => x.Category).Returns(categoryRepo.Object);
    repo.Setup(x => x.SaveAsync());
    CategoryService sut = new CategoryService(repo.Object);
    //When
    await sut.RemoveRangeAsync(user, ids);
  }
  [Fact]
  public async void RemoveRangeAsync_Throws_Exception_When_Save_Error()
  {
    //Given
    var ids = CategoryFixtures.GetCategories().Select(c => c.Id).ToList();
    var categoriesMock = CategoryFixtures.GetCategories();
    categoryRepo.Setup(x => x.Get(It.IsAny<Expression<Func<Category, bool>>>(), null)).Returns(categoriesMock);
    categoryRepo.Setup(x => x.RemoveRange(It.IsAny<List<Category>>()));
    repo.Setup(x => x.Category).Returns(categoryRepo.Object);
    repo.Setup(x => x.SaveAsync()).Throws(new Exception());
    CategoryService sut = new CategoryService(repo.Object);
    //When
    await Assert.ThrowsAsync<Exception>(() => sut.RemoveRangeAsync(user, ids));
  }
  [Fact]
  public async void UpdateAsync_Throws_Exception_When_Save_Error()
  {
    //Given
    var categoryMock = CategoryFixtures.GetCategories()[0];
    var categoryDTOMock = CategoryFixtures.GetCategoriesDTO()[0];
    categoryRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Category, bool>>>(), null)).ReturnsAsync(() => categoryMock);
    categoryRepo.Setup(x => x.Update(categoryMock, It.IsAny<object>()));
    repo.Setup(x => x.Category).Returns(categoryRepo.Object);
    repo.Setup(x => x.SaveAsync()).Throws(new Exception());
    CategoryService sut = new CategoryService(repo.Object);
    //When
    await Assert.ThrowsAsync<Exception>(() => sut.UpdateAsync(user, categoryDTOMock, categoryDTOMock));
  }
  [Fact]
  public async void UpdateAsync_Success()
  {
    //Given
    var categoryMock = CategoryFixtures.GetCategories()[0];
    var categoryDTOMock = CategoryFixtures.GetCategoriesDTO()[0];
    categoryRepo.Setup(x => x.GetSingleAsync(It.IsAny<Expression<Func<Category, bool>>>(), null)).ReturnsAsync(() => categoryMock);
    categoryRepo.Setup(x => x.Update(categoryMock, It.IsAny<object>()));
    repo.Setup(x => x.Category).Returns(categoryRepo.Object);
    repo.Setup(x => x.SaveAsync());
    CategoryService sut = new CategoryService(repo.Object);
    //When
    var result = await sut.UpdateAsync(user, categoryDTOMock, categoryDTOMock);
    Assert.Same(categoryDTOMock, result);
  }
}