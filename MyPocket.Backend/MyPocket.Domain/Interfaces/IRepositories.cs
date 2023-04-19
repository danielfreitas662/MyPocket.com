
namespace MyPocket.Domain.Interfaces
{
  public interface IRepositories
  {
    IAccountRepository Account { get; }
    IBudgetRepository Budget { get; }
    ICategoryRepository Category { get; }
    ITransactionRepository Transaction { get; }
    IUserRepository User { get; }
    IBudgetItemRepository BudgetItem { get; }
    Task<int> SaveAsync();
    void BeginTransaction();
    Task CompleteAsync();
  }
}