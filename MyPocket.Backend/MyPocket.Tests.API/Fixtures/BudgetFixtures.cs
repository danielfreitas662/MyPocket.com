using System.Collections.Generic;
using MyPocket.Application.DTO;
using System;

namespace MyPocket.Tests.API.Fixtures
{
  public static class BudgetFixtures
  {
    private static List<BudgetDTO> Budgets = new List<BudgetDTO>{
      new BudgetDTO{
        Id = Guid.NewGuid(),
        Month = DateTime.Today,
        Amount = 1000,
        CategoryId = CategoryFixtures.GetCategories()[0].Id.Value
      },
      new BudgetDTO{
        Id = Guid.NewGuid(),
        Month = DateTime.Today.AddMonths(1),
        Amount = 2000,
        CategoryId = CategoryFixtures.GetCategories()[1].Id.Value
      },
      new BudgetDTO{
        Id = Guid.NewGuid(),
        Month = DateTime.Today.AddMonths(2),
        Amount = 3000,
        CategoryId = CategoryFixtures.GetCategories()[2].Id.Value
      },
      new BudgetDTO{
        Id = Guid.NewGuid(),
        Month = DateTime.Today.AddMonths(3),
        Amount = 4000,
        CategoryId = CategoryFixtures.GetCategories()[3].Id.Value
      },
    };

    public static List<BudgetDTO> GetBudgets() => Budgets;
  }
}