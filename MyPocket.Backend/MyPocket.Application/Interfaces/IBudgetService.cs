using MyPocket.Application.DTO;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Interfaces
{
  public interface IBudgetService
  {
    List<BudgetDTO> GetAll(string UserId);
    PaginationResult<BudgetDTO> Filter(PaginationRequest<BudgetDTO> data, UserData user);
    Task<BudgetDTO?> GetByIdAsync(string UserId, Guid Id);
    Task<BudgetDTO> AddAsync(UserData User, BudgetDTO account);
    Task<BudgetDTO> UpdateAsync(UserData User, BudgetDTO account, BudgetDTO values);
    Task RemoveAsync(UserData user, BudgetDTO account);
    Task RemoveRangeAsync(UserData user, List<Guid> ids);
  }
}