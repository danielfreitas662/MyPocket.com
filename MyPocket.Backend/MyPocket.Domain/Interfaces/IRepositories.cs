
namespace MyPocket.Domain.Interfaces
{
  public interface IRepositories
  {
    IAccountRepository Account { get; }
    IBudgetRepository Budget { get; }
    ICategoryRepository Category { get; }
    ITransactionRepository Transaction { get; }
  }
}