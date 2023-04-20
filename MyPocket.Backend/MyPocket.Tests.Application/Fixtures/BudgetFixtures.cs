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
      },
      new BudgetDTO{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
        Amount= 1000,
      },
      new BudgetDTO{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
        Amount= 1000,
      },
      new BudgetDTO{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
        Amount= 1000,
      },
      new BudgetDTO{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
        Amount= 1000,
      }
    };
    private static List<Budget> Budgets = new List<Budget>{
      new Budget{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
      },
      new Budget{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
      },
      new Budget{
         Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
      },
      new Budget{
         Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
      },
      new Budget{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
      }
    };

    public static List<BudgetDTO> GetBudgetsDTO() => BudgetsDTO;
    public static List<Budget> GetBudgets() => Budgets;
  }
}