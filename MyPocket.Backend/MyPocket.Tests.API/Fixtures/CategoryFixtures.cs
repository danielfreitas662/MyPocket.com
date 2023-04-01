using System.Collections.Generic;
using MyPocket.Application.DTO;
using System;
using MyPocket.Domain.Models;

namespace MyPocket.Tests.API.Fixtures
{
  public static class CategoryFixtures
  {
    private static List<CategoryDTO> Categories = new List<CategoryDTO>{
      new CategoryDTO{
        Id = Guid.NewGuid().ToString(),
        Name = "Home Expenses",
        Type = CategoryType.Outcome,
        UserId = UserFixtures.GetUsers()[0].Id
      },
      new CategoryDTO{
        Id = Guid.NewGuid().ToString(),
        Name = "Car Expenses",
        Type = CategoryType.Outcome,
        UserId = UserFixtures.GetUsers()[0].Id
      },
      new CategoryDTO{
        Id = Guid.NewGuid().ToString(),
        Name = "Energy",
        Type = CategoryType.Outcome,
        UserId = UserFixtures.GetUsers()[0].Id
      },
      new CategoryDTO{
        Id = Guid.NewGuid().ToString(),
        Name = "Water",
        Type = CategoryType.Outcome,
        UserId = UserFixtures.GetUsers()[0].Id
      },
      new CategoryDTO{
        Id = Guid.NewGuid().ToString(),
        Name = "Salary",
        Type= CategoryType.Income,
        UserId = UserFixtures.GetUsers()[0].Id
      }
    };

    public static List<CategoryDTO> GetCategories() => Categories;
  }
}