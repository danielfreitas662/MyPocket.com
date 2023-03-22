
namespace MyPocket.Application.Interfaces
{
  public interface IApplicationService
  {
    IAccountService Account { get; }
    IBudgetService Budget { get; }
    ICategoryService Category { get; }
    ITransactionService Transaction { get; }
    IUserService User { get; }
  }
}