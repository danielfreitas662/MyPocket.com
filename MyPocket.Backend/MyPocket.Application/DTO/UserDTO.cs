namespace MyPocket.Application.DTO
{
  public class UserDTO
  {
    public string? Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
    public List<TransactionDTO>? Transactions { get; set; }
  }
  public class RegisterResultModel
  {
    public UserDTO? User { get; set; }
    public bool Success { get; set; }
    public string Message { get; set; }
  }
  public class LoginResultModel
  {
    public bool Success { get; set; }
    public string Message { get; set; }
    public string Token { get; set; }
  }
  public class LoginModel
  {
    public string Email { get; set; }
    public string Password { get; set; }
  }
  public class RegisterModel
  {
    public string Email { get; set; }
    public string Password { get; set; }
    public string Name { get; set; }
  }
  public class ChangePasswordRequestModel
  {
    public string Email { get; set; }
    public string OldPassword { get; set; }
    public string NewPassword { get; set; }
  }
  public class ChangePasswordResultModel
  {
    public bool Success { get; set; }
    public string Message { get; set; }
  }
  public class ForgotPasswordRequestModel
  {
    public string Email { get; set; }
  }
  public class ResetPasswordRequestModel
  {
    public string Email { get; set; }
    public string NewPassword { get; set; }
    public string Code { get; set; }
  }
  public class ResetPasswordResultModel
  {
    public bool Success { get; set; }
    public string Message { get; set; }
  }
}