using MyPocket.Application.DTO;
using MyPocket.Application.Interfaces;
using MyPocket.Domain.Interfaces;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Services
{
  public class TransactionService : ITransactionService
  {
    private readonly IRepositories _repo;
    public TransactionService(IRepositories repo)
    {
      _repo = repo;
    }

    public Task<TransactionDTO> AddAsync(UserData User, TransactionDTO account)
    {
      throw new NotImplementedException();
    }

    public Task<AddOrUpdateResult<TransactionDTO>> AddOrUpdateAsync(UserData user, TransactionDTO account)
    {
      throw new NotImplementedException();
    }

    public PaginationResult<TransactionDTO> Filter(PaginationRequest<TransactionDTO> data, UserData user)
    {
      throw new NotImplementedException();
    }

    public List<TransactionDTO> GetAll(string UserId)
    {
      throw new NotImplementedException();
    }

    public Task<TransactionDTO> GetByIdAsync(string UserId, string Id)
    {
      throw new NotImplementedException();
    }

    public Task Remove(UserData user, TransactionDTO account)
    {
      throw new NotImplementedException();
    }

    public Task RemoveRange(UserData user, List<Guid> ids)
    {
      throw new NotImplementedException();
    }

    public Task<TransactionDTO> UpdateAsync(UserData User, TransactionDTO account, TransactionDTO values)
    {
      throw new NotImplementedException();
    }
  }
}