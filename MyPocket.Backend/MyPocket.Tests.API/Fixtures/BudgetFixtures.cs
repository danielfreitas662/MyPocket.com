using System.Collections.Generic;
using MyPocket.Application.DTO;
using System;

namespace MyPocket.Tests.API.Fixtures
{
  public static class BudgetFixtures
  {
    private static List<BudgetDTO> Budgets = new List<BudgetDTO>{
      new BudgetDTO{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today,
        Amount = 1000,
      },
      new BudgetDTO{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today.AddMonths(1),
        Amount = 2000,
      },
      new BudgetDTO{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today.AddMonths(2),
        Amount = 3000,
      },
      new BudgetDTO{
        Id = Guid.NewGuid().ToString(),
        Month = DateTime.Today.AddMonths(3),
        Amount = 4000,
      },
    };

    public static List<BudgetDTO> GetBudgets() => Budgets;
  }
}