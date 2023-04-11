using MyPocket.Domain.Models;
namespace MyPocket.Domain.Interfaces
{
  public interface IAccountRepository : IBaseRepository<Account>
  {
    PaginationResult<AccountWithRelated> Filter(PaginationRequest<AccountWithRelated> filters, string userId);
  }
}