using MyPocket.Application.DTO;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Interfaces
{
  public interface IAccountService
  {
    List<AccountDTO> GetAll(string UserId);
    PaginationResult<AccountDTO> Filter(PaginationRequest<AccountDTO> data, UserData user);
    Task<AccountDTO> GetByIdAsync(string UserId, string Id);
    AccountDTO AddOrUpdate(UserData user);
    Task Remove(AccountDTO account);
    Task RemoveRange(List<AccountDTO> accounts);
  }
}