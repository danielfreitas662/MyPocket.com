using System.Collections.Generic;
using MyPocket.Application.DTO;
using System;
using MyPocket.Domain.Models;

namespace MyPocket.Tests.Application.Fixtures
{
  public static class AccountFixtures
  {
    private static List<Account> Accounts = new List<Account>{
      new Account{
        Id = Guid.NewGuid(),
        Name ="Bank Account 1"
      },
      new Account{
        Id = Guid.NewGuid(),
        Name ="Crédit Card 1"
      },
      new Account{
        Id = Guid.NewGuid(),
        Name ="Bank Account 2"
      },
      new Account{
        Id = Guid.NewGuid(),
        Name ="Credit Card 2"
      },
    };
    private static List<AccountDTO> AccountsDTO = new List<AccountDTO>{
      new AccountDTO{
        Id = Guid.NewGuid(),
        Name ="Bank Account 1"
      },
      new AccountDTO{
        Id = Guid.NewGuid(),
        Name ="Crédit Card 1"
      },
      new AccountDTO{
        Id = Guid.NewGuid(),
        Name ="Bank Account 2"
      },
      new AccountDTO{
        Id = Guid.NewGuid(),
        Name ="Credit Card 2"
      },
    };

    public static List<Account> GetAccounts() => Accounts;
    public static List<AccountDTO> GetAccountsDTO() => AccountsDTO;
  }
}