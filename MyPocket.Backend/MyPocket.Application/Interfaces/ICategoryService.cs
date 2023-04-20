using MyPocket.Application.DTO;
using MyPocket.Domain.Models;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Interfaces
{
  public interface ICategoryService
  {
    List<CategoryDTO> GetAll(string UserId);
    PaginationResult<CategoryWithRelated> Filter(PaginationRequest<CategoryWithRelated> data, UserData user);
    Task<CategoryDTO?> GetByIdAsync(string UserId, string Id);
    Task<CategoryDTO> AddAsync(UserData User, CategoryDTO account);
    Task<CategoryDTO> UpdateAsync(UserData User, CategoryDTO account, CategoryDTO values);
    Task RemoveAsync(UserData user, CategoryDTO account);
    Task RemoveRangeAsync(UserData user, List<string> ids);
    List<CategoryExpenseBudgetDTO> GetExpensesAndBudgets(DateTime month, string userId);
  }
}