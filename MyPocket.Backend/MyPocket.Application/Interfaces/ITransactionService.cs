using MyPocket.Application.DTO;
using MyPocket.Domain.Models;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Interfaces
{
  public interface ITransactionService
  {
    List<TransactionDTO> GetAll(string UserId);
    PaginationResult<TransactionWithRelated> Filter(PaginationRequest<TransactionWithRelated> data, UserData user);
    Task<TransactionDTO?> GetByIdAsync(string UserId, string Id);
    Task<TransactionDTO> AddAsync(UserData User, TransactionDTO account);
    Task<TransactionDTO> UpdateAsync(UserData User, TransactionDTO account, TransactionDTO values);
    Task RemoveAsync(UserData user, TransactionDTO account);
    Task RemoveRangeAsync(UserData user, List<string> ids);
  }
}