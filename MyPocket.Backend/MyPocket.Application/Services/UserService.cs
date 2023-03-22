using MyPocket.Application.Interfaces;
using MyPocket.Domain.Interfaces;

namespace MyPocket.Application.Services
{
  public class UserService : IUserService
  {
    private readonly IRepositories _repo;
    public UserService(IRepositories repo)
    {
      _repo = repo;
    }

  }
}