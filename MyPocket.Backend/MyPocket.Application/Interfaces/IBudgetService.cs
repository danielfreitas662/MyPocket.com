using MyPocket.Application.DTO;
using MyPocket.Domain.Models;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Interfaces
{
  public interface IBudgetService
  {
    List<BudgetDTO> GetAll(string UserId);
    PaginationResult<BudgetWithRelated> Filter(PaginationRequest<BudgetWithRelated> data, UserData user);
    Task<BudgetDTO?> GetByIdAsync(string UserId, string Id);
    Task<BudgetDTO> AddAsync(UserData User, BudgetDTO account);
    Task<BudgetDTO> UpdateAsync(UserData User, BudgetDTO account, BudgetDTO values);
    Task RemoveAsync(UserData user, BudgetDTO account);
    Task RemoveRangeAsync(UserData user, List<string> ids);
    Task<BudgetItemDTO?> GetItemAsync(string itemId, string userId);
    List<BudgetItemDTO> GetItems(string budgetId, string userId);
    Task<BudgetItemDTO> AddItemAsync(BudgetItemDTO item, string userId);
    Task<string> RemoveItemAsync(string itemId, string userId);
    Task<BudgetItemDTO> UpdateItemAsync(BudgetItemDTO item, string userId);
    Task<BudgetDTO> GetByMonthAsync(DateTime month, string userId);
  }
}