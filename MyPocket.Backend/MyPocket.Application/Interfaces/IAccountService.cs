using MyPocket.Application.DTO;
using MyPocket.Domain.Models;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Interfaces
{
  public interface IAccountService
  {
    List<AccountDTO> GetAll(string UserId);
    PaginationResult<AccountWithRelated> Filter(PaginationRequest<AccountWithRelated> data, UserData user);
    Task<AccountDTO?> GetByIdAsync(string UserId, string Id);
    Task<AccountDTO> AddAsync(UserData User, AccountDTO account);
    Task<AccountDTO> UpdateAsync(UserData User, AccountDTO account, AccountDTO values);
    Task RemoveAsync(UserData user, AccountDTO account);
    Task RemoveRangeAsync(UserData user, List<string> ids);
  }
}