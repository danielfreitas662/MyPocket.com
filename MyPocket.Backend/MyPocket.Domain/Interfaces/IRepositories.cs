using System.Collections.Generic;
using MyPocket.Domain.Models;
namespace MyPocket.Domain.Interfaces
{
  public interface IRepositories
  {
    public readonly IAccountRepository Account;
    public readonly IBudgetRepository Budget;
    public readonly ICategoryRepository Category;
    public readonly ITransactionRepository Transaction;
  }
}