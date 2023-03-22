using MyPocket.Application.DTO;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Interfaces
{
  public interface ITransactionService
  {
    List<TransactionDTO> GetAll(string UserId);
    PaginationResult<TransactionDTO> Filter(PaginationRequest<TransactionDTO> data, UserData user);
    Task<TransactionDTO> GetByIdAsync(string UserId, string Id);
    TransactionDTO AddOrUpdate(UserData user);
    Task Remove(TransactionDTO account);
    Task RemoveRange(List<TransactionDTO> accounts);
  }
}