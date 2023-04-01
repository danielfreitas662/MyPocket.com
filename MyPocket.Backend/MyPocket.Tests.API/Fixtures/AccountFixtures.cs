using System.Collections.Generic;
using MyPocket.Application.DTO;
using System;

namespace MyPocket.Tests.API.Fixtures
{
  public static class AccountFixtures
  {
    private static List<AccountDTO> Accounts = new List<AccountDTO>{
      new AccountDTO{
        Id = Guid.NewGuid().ToString(),
        Name ="Bank Account 1"
      },
      new AccountDTO{
        Id = Guid.NewGuid().ToString(),
        Name ="Crédit Card 1"
      },
      new AccountDTO{
        Id = Guid.NewGuid().ToString(),
        Name ="Bank Account 2"
      },
      new AccountDTO{
        Id = Guid.NewGuid().ToString(),
        Name ="Credit Card 2"
      },
    };

    public static List<AccountDTO> GetAccounts() => Accounts;
  }
}