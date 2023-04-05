using MyPocket.Domain.Models;
namespace MyPocket.Domain.Interfaces
{
  public interface ITransactionRepository : IBaseRepository<Transaction>
  {
    List<Transaction> GetByAccount(Guid UserID);
    List<Transaction> GetByCategoryID(Guid UserID, int CategoryID);
    List<AmountByCategoryModel> AmountByCategoryByMonth(string userId, DateTime month);
    List<MonthTransaction> MonthTransactionAmount(string userId, DateTime month, CategoryType type);
    List<ResultByMonth> ResultByMonth(string userId, DateTime month);
  }
}