using MyPocket.Application.DTO;
using MyPocket.Application.Interfaces;
using MyPocket.Domain.Interfaces;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Services
{
  public class AccountService : IAccountService
  {
    private readonly IRepositories _repo;
    public AccountService(IRepositories repo)
    {
      _repo = repo;
    }

    public Task<AccountDTO> AddAsync(UserData User, AccountDTO account)
    {
      throw new NotImplementedException();
    }

    public async Task<AddOrUpdateResult<AccountDTO>> AddOrUpdateAsync(UserData user, AccountDTO account)
    {
      throw new NotImplementedException();
    }

    public PaginationResult<AccountDTO> Filter(PaginationRequest<AccountDTO> data, UserData user)
    {
      throw new NotImplementedException();
    }

    public List<AccountDTO> GetAll(string UserId)
    {
      throw new NotImplementedException();
    }

    public Task<AccountDTO> GetByIdAsync(string UserId, string Id)
    {
      throw new NotImplementedException();
    }

    public Task Remove(UserData user, AccountDTO account)
    {
      throw new NotImplementedException();
    }

    public Task RemoveRange(UserData user, List<string> ids)
    {
      throw new NotImplementedException();
    }

    public Task<AccountDTO> UpdateAsync(UserData User, AccountDTO account, AccountDTO values)
    {
      throw new NotImplementedException();
    }
  }
}