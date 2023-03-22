using MyPocket.Domain.Models;
namespace MyPocket.Domain.Interfaces
{
  public interface ITransactionRepository : IBaseRepository<Transaction>
  {
    List<Transaction> GetByAccount(Guid UserID);
    List<Transaction> GetByCategoryID(Guid UserID, int CategoryID);
  }
}