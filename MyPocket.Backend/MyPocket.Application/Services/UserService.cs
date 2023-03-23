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

    public Task<LoginResultModel> AuthenticateAsync(LoginModel user)
    {
      throw new NotImplementedException();
    }

    public Task<ChangePasswordResultModel> ChangePasswordAsync(ChangePasswordRequestModel data)
    {
      throw new NotImplementedException();
    }

    public Task ForgotPasswordAsync(ForgotPasswordRequestModel data)
    {
      throw new NotImplementedException();
    }

    public Task<UserDTO> GetByIdAsync(string Id)
    {
      throw new NotImplementedException();
    }

    public Task<RegisterResultModel> RegisterAsync(UserDTO user)
    {
      throw new NotImplementedException();
    }

    public Task<ResetPasswordResultModel> ResetPasswordAsync(ResetPasswordRequestModel data)
    {
      throw new NotImplementedException();
    }
  }
}