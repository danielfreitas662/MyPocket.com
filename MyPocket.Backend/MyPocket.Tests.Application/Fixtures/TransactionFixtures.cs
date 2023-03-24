using System.Collections.Generic;
using MyPocket.Application.DTO;
using System;
using MyPocket.Domain.Models;

namespace MyPocket.Tests.Application.Fixtures
{
  public static class TransactionFixtures
  {
    private static List<Category> categoriesFixture => CategoryFixtures.GetCategories();
    private static List<Account> accountsFixture => AccountFixtures.GetAccounts();
    private static List<User> usersFixture => UserFixtures.GetUsers();
    private static List<TransactionDTO> TransactionsDTO => new List<TransactionDTO>{
      new TransactionDTO{
        Id = Guid.NewGuid(),
        Description = "School",
        Amount = 1000,
        Date = DateTime.Today,
        UserId = usersFixture[0].Id,
        CategoryId = categoriesFixture[1].Id,
        AccountId = accountsFixture[0].Id,
        Category = categoriesFixture[1].Name,
        Account = accountsFixture[0].Name

      },
      new TransactionDTO{
        Id = Guid.NewGuid(),
        Description = "Home Rental",
        Amount = 2000,
        Date = DateTime.Today,
        UserId = usersFixture[0].Id,
        CategoryId = categoriesFixture[1].Id,
        AccountId = accountsFixture[1].Id,
        Category = categoriesFixture[1].Name,
        Account = accountsFixture[1].Name
      },
      new TransactionDTO{
       Id = Guid.NewGuid(),
        Description = "Home Energy",
        Amount = 500,
        Date = DateTime.Today,
        UserId = usersFixture[0].Id,
        CategoryId = categoriesFixture[2].Id,
        AccountId = accountsFixture[1].Id,
        Category = categoriesFixture[2].Name,
        Account = accountsFixture[1].Name
      },
      new TransactionDTO{
       Id = Guid.NewGuid(),
        Description = "Restaurant",
        Amount = 200,
        Date = DateTime.Today,
        UserId = usersFixture[0].Id,
        CategoryId = categoriesFixture[2].Id,
        AccountId = accountsFixture[2].Id,
        Category = categoriesFixture[2].Name,
        Account = accountsFixture[2].Name
      },
      new TransactionDTO{
        Id = Guid.NewGuid(),
        Description = "Food Shopping",
        Amount = 4000,
        Date = DateTime.Today,
        UserId = usersFixture[0].Id,
        CategoryId = categoriesFixture[3].Id,
        AccountId = accountsFixture[3].Id,
        Category = categoriesFixture[3].Name,
        Account = accountsFixture[3].Name
      }
    };
    private static List<Transaction> Transactions => new List<Transaction>{
      new Transaction{
        Id = Guid.NewGuid(),
        Description = "School",
        Amount = 1000,
        Date = DateTime.Today,
        UserId = usersFixture[0].Id,
        CategoryId = categoriesFixture[1].Id,
        AccountId = accountsFixture[0].Id,
        Category = categoriesFixture[1],
        Account = accountsFixture[0]

      },
      new Transaction{
        Id = Guid.NewGuid(),
        Description = "Home Rental",
        Amount = 2000,
        Date = DateTime.Today,
        UserId = usersFixture[0].Id,
        CategoryId = categoriesFixture[1].Id,
        AccountId = accountsFixture[1].Id,
        Category = categoriesFixture[1],
        Account = accountsFixture[1]
      },
      new Transaction{
       Id = Guid.NewGuid(),
        Description = "Home Energy",
        Amount = 500,
        Date = DateTime.Today,
        UserId = usersFixture[0].Id,
        CategoryId = categoriesFixture[2].Id,
        AccountId = accountsFixture[1].Id,
        Category = categoriesFixture[2],
        Account = accountsFixture[1]
      },
      new Transaction{
       Id = Guid.NewGuid(),
        Description = "Restaurant",
        Amount = 200,
        Date = DateTime.Today,
        UserId = usersFixture[0].Id,
        CategoryId = categoriesFixture[2].Id,
        AccountId = accountsFixture[2].Id,
        Category = categoriesFixture[2],
        Account = accountsFixture[2]
      },
      new Transaction{
        Id = Guid.NewGuid(),
        Description = "Food Shopping",
        Amount = 4000,
        Date = DateTime.Today,
        UserId = usersFixture[0].Id,
        CategoryId = categoriesFixture[3].Id,
        AccountId = accountsFixture[3].Id,
        Category = categoriesFixture[3],
        Account = accountsFixture[3]
      }
    };

    public static List<TransactionDTO> GetTransactionsDTO() => TransactionsDTO;
    public static List<Transaction> GetTransactions() => Transactions;
    //372345756135890
  }
}