using System.Collections.Generic;
using MyPocket.Application.DTO;
using System;
using MyPocket.Domain.Models;

namespace MyPocket.Tests.Application.Fixtures
{
  public static class BudgetFixtures
  {
    private static List<Category> categoriesFixture = CategoryFixtures.GetCategories();
    private static List<BudgetDTO> BudgetsDTO = new List<BudgetDTO>{
      new BudgetDTO{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
        Amount= 1000,
        CategoryId = categoriesFixture[0].Id,
        Category= categoriesFixture[0].Name
      },
      new BudgetDTO{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
        Amount= 1000,
        CategoryId = categoriesFixture[0].Id,
        Category= categoriesFixture[0].Name
      },
      new BudgetDTO{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
        Amount= 1000,
        CategoryId = categoriesFixture[0].Id,
        Category= categoriesFixture[0].Name
      },
      new BudgetDTO{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
        Amount= 1000,
        CategoryId = categoriesFixture[0].Id,
        Category= categoriesFixture[0].Name
      },
      new BudgetDTO{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
        Amount= 1000,
        CategoryId = categoriesFixture[0].Id,
        Category= categoriesFixture[0].Name
      }
    };
    private static List<Budget> Budgets = new List<Budget>{
      new Budget{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
        Amount= 1000,
        Category = CategoryFixtures.GetCategories()[0],
        CategoryId = categoriesFixture[0].Id
      },
      new Budget{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
        Amount= 2000,
         Category = CategoryFixtures.GetCategories()[1],
        CategoryId = categoriesFixture[1].Id
      },
      new Budget{
         Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
        Amount= 3000,
         Category = CategoryFixtures.GetCategories()[2],
        CategoryId = categoriesFixture[2].Id
      },
      new Budget{
         Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
        Amount= 500,
         Category = CategoryFixtures.GetCategories()[3],
        CategoryId = categoriesFixture[3].Id
      },
      new Budget{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
        Amount= 800,
         Category = CategoryFixtures.GetCategories()[4],
        CategoryId = categoriesFixture[4].Id
      }
    };

    public static List<BudgetDTO> GetBudgetsDTO() => BudgetsDTO;
    public static List<Budget> GetBudgets() => Budgets;
  }
}