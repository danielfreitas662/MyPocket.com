using MyPocket.Application.DTO;

namespace MyPocket.Application.Interfaces
{
  public interface IUserService
  {
    Task<LoginResultModel> AuthenticateAsync(LoginModel user);
    Task<UserDTO> GetByIdAsync(string Id);
    Task<RegisterResultModel> RegisterAsync(UserDTO user);
    Task<ChangePasswordResultModel> ChangePasswordAsync(ChangePasswordRequestModel data);
    Task<string> ForgotPasswordAsync(ForgotPasswordRequestModel data);
    Task<ResetPasswordResultModel> ResetPasswordAsync(ResetPasswordRequestModel data);

  }
}