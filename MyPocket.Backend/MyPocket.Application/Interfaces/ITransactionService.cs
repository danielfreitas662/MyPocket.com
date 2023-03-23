using MyPocket.Application.DTO;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Interfaces
{
  public interface ITransactionService
  {
    List<TransactionDTO> GetAll(string UserId);
    PaginationResult<TransactionDTO> Filter(PaginationRequest<TransactionDTO> data, UserData user);
    Task<TransactionDTO> GetByIdAsync(string UserId, string Id);
    Task<AddOrUpdateResult<TransactionDTO>> AddOrUpdateAsync(UserData user, TransactionDTO account);
    Task<TransactionDTO> AddAsync(UserData User, TransactionDTO account);
    Task<TransactionDTO> UpdateAsync(UserData User, TransactionDTO account, TransactionDTO values);
    Task Remove(UserData user, TransactionDTO account);
    Task RemoveRange(UserData user, List<Guid> ids);
  }
}