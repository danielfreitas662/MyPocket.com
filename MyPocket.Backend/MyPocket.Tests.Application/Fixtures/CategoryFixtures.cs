using System.Collections.Generic;
using MyPocket.Application.DTO;
using System;
using MyPocket.Domain.Models;

namespace MyPocket.Tests.Application.Fixtures
{
  public static class CategoryFixtures
  {
    private static List<CategoryDTO> CategoriesDTO = new List<CategoryDTO>{
      new CategoryDTO{
        Id = Guid.NewGuid(),
        Name = "Home Expenses",
        Type = CategoryType.Outcome,
        UserId = UserFixtures.GetUsers()[0].Id
      },
      new CategoryDTO{
        Id = Guid.NewGuid(),
        Name = "Car Expenses",
        Type = CategoryType.Outcome,
        UserId = UserFixtures.GetUsers()[0].Id
      },
      new CategoryDTO{
        Id = Guid.NewGuid(),
        Name = "Energy",
        Type = CategoryType.Outcome,
        UserId = UserFixtures.GetUsers()[0].Id
      },
      new CategoryDTO{
        Id = Guid.NewGuid(),
        Name = "Water",
        Type = CategoryType.Outcome,
        UserId = UserFixtures.GetUsers()[0].Id
      },
      new CategoryDTO{
        Id = Guid.NewGuid(),
        Name = "Salary",
        Type= CategoryType.Income,
        UserId = UserFixtures.GetUsers()[0].Id
      }
    };
    private static List<Category> Categories = new List<Category>{
      new Category{
        Id = Guid.NewGuid(),
        Name = "Home Expenses",
        Type = CategoryType.Outcome,
        UserId = UserFixtures.GetUsers()[0].Id
      },
      new Category{
        Id = Guid.NewGuid(),
        Name = "Car Expenses",
        Type = CategoryType.Outcome,
        UserId = UserFixtures.GetUsers()[0].Id
      },
      new Category{
        Id = Guid.NewGuid(),
        Name = "Energy",
        Type = CategoryType.Outcome,
        UserId = UserFixtures.GetUsers()[0].Id
      },
      new Category{
        Id = Guid.NewGuid(),
        Name = "Water",
        Type = CategoryType.Outcome,
        UserId = UserFixtures.GetUsers()[0].Id
      },
      new Category{
        Id = Guid.NewGuid(),
        Name = "Salary",
        Type= CategoryType.Income,
        UserId = UserFixtures.GetUsers()[0].Id
      }
    };

    public static List<CategoryDTO> GetCategoriesDTO() => CategoriesDTO;
    public static List<Category> GetCategories() => Categories;
    //372345756135890
  }
}