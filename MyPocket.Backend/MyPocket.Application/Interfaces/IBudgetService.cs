using MyPocket.Application.DTO;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Interfaces
{
  public interface IBudgetService
  {
    List<BudgetDTO> GetAll(string UserId);
    PaginationResult<BudgetDTO> Filter(PaginationRequest<BudgetDTO> data, UserData user);
    Task<AccountDTO> GetByIdAsync(string UserId, string Id);
    BudgetDTO AddOrUpdate(UserData user);
    Task Remove(BudgetDTO account);
    Task RemoveRange(List<BudgetDTO> accounts);
  }
}