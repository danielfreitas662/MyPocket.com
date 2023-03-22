using MyPocket.Application.DTO;

namespace MyPocket.Application.Interfaces
{
  public interface IUserService
  {
    Task<string> Authenticate(UserDTO user, string password);
    UserDTO CheckAuthentication();
    UserDTO Register(UserDTO user);
  }
}