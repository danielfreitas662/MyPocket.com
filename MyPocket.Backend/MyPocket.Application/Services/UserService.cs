using MyPocket.Application.DTO;
using MyPocket.Application.Interfaces;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;

namespace MyPocket.Application.Services
{
  public class UserService : IUserService
  {
    private readonly IRepositories _repo;
    public UserService(IRepositories repo)
    {
      _repo = repo;
    }

    public Task<string> Authenticate(UserDTO user, string password)
    {
      throw new NotImplementedException();
    }

    public UserDTO CheckAuthentication()
    {
      throw new NotImplementedException();
    }

    public UserDTO Register(UserDTO user)
    {
      throw new NotImplementedException();
    }
  }
}