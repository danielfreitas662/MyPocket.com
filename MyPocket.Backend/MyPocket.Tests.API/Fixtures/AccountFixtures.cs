using System.Collections.Generic;
using MyPocket.Application.DTO;
using System;

namespace MyPocket.Tests.API.Fixtures
{
  public static class AccountFixtures
  {
    private static List<AccountDTO> Accounts = new List<AccountDTO>{
      new AccountDTO{
        Id = Guid.Parse("3fa4c24b-ca95-49a8-849b-2078f40f3982"),
        Name ="Bank Account 1"
      },
      new AccountDTO{
        Id = Guid.Parse("3fa4c24b-ca95-49a8-849b-2078f40f3982"),
        Name ="Crédit Card 1"
      },
      new AccountDTO{
        Id = Guid.Parse("3fa4c24b-ca95-49a8-849b-2078f40f3982"),
        Name ="Bank Account 2"
      },
      new AccountDTO{
        Id = Guid.Parse("3fa4c24b-ca95-49a8-849b-2078f40f3982"),
        Name ="Credit Card 2"
      },
    };

    public static List<AccountDTO> GetAccounts() => Accounts;
  }
}