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

    public AccountDTO AddOrUpdate(UserData user)
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

    public Task Remove(AccountDTO account)
    {
      throw new NotImplementedException();
    }

    public Task RemoveRange(List<AccountDTO> accounts)
    {
      throw new NotImplementedException();
    }
  }
}