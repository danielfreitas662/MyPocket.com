using MyPocket.Application.Interfaces;
using MyPocket.Domain.Interfaces;

namespace MyPocket.Application.Services
{
  public class AccountService : IAccountService
  {
    private readonly IRepositories _repo;
    public AccountService(IRepositories repo)
    {
      _repo = repo;
    }

  }
}