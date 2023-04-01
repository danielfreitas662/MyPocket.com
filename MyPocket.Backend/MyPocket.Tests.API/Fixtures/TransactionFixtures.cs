using System.Collections.Generic;
using MyPocket.Application.DTO;
using System;
using MyPocket.Domain.Models;

namespace MyPocket.Tests.API.Fixtures
{
  public static class TransactionFixtures
  {
    private static List<TransactionDTO> Transactions = new List<TransactionDTO>{
      new TransactionDTO{
        Id = Guid.NewGuid().ToString(),
        Description = "School",
        Amount = 1000,
        Date = DateTime.Today,
        UserId = UserFixtures.GetUsers()[0].Id,
        CategoryId = CategoryFixtures.GetCategories()[1].Id,
        AccountId = AccountFixtures.GetAccounts()[0].Id

      },
      new TransactionDTO{
        Id = Guid.NewGuid().ToString(),
        Description = "Home Rental",
        Amount = 2000,
        Date = DateTime.Today,
        UserId = UserFixtures.GetUsers()[0].Id,
        CategoryId = CategoryFixtures.GetCategories()[1].Id,
        AccountId = AccountFixtures.GetAccounts()[1].Id
      },
      new TransactionDTO{
       Id = Guid.NewGuid().ToString(),
        Description = "Home Energy",
        Amount = 500,
        Date = DateTime.Today,
        UserId = UserFixtures.GetUsers()[0].Id,
        CategoryId = CategoryFixtures.GetCategories()[2].Id,
        AccountId = AccountFixtures.GetAccounts()[1].Id
      },
      new TransactionDTO{
       Id = Guid.NewGuid().ToString(),
        Description = "Restaurant",
        Amount = 200,
        Date = DateTime.Today,
        UserId = UserFixtures.GetUsers()[0].Id,
        CategoryId = CategoryFixtures.GetCategories()[2].Id,
        AccountId = AccountFixtures.GetAccounts()[2].Id
      },
      new TransactionDTO{
        Id = Guid.NewGuid().ToString(),
        Description = "Food Shopping",
        Amount = 4000,
        Date = DateTime.Today,
        UserId = UserFixtures.GetUsers()[0].Id,
        CategoryId = CategoryFixtures.GetCategories()[3].Id,
        AccountId = AccountFixtures.GetAccounts()[3].Id
      }
    };

    public static List<TransactionDTO> GetTransactions() => Transactions;
  }
}