using MyPocket.Domain.Models;
namespace MyPocket.Domain.Interfaces
{
  public interface IBudgetRepository : IBaseRepository<Budget>
  {
    PaginationResult<BudgetWithRelated> Filter(PaginationRequest<BudgetWithRelated> filters, string userId);
  }
}