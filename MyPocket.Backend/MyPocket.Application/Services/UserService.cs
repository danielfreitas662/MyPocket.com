using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MyPocket.Application.DTO;
using MyPocket.Application.Interfaces;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyPocket.Application.Services
{
  public class UserService : IUserService
  {
    private readonly IRepositories _repo;
    private readonly SignInManager<User> _signInManager;
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _config;
    public UserService(IRepositories repo, SignInManager<User> signInManager, IConfiguration config, UserManager<User> userManager)
    {
      _repo = repo;
      _signInManager = signInManager;
      _config = config;
      _userManager = userManager;
    }
    public string BuildToken(User user)
    {
      try
      {
        var tokenhandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_config["JWT:key"]);
        var tokendescriptor = new SecurityTokenDescriptor
        {
          Subject = new ClaimsIdentity(new Claim[]
                  {
                    new Claim(ClaimTypes.Name, user.UserName.ToString()),
                    new Claim("UserID", user.Id.ToString()),
                    new Claim("Email", user.Email.ToString()),
                    new Claim("Name", user.FirstName +" "+ user.LastName,"string")
                  }),
          Expires = DateTime.Now.AddHours(-3).AddDays(10),
          SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenhandler.CreateToken(tokendescriptor);
        return tokenhandler.WriteToken(token);
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task<LoginResultModel> AuthenticateAsync(LoginModel user)
    {
      try
      {
        var findUser = await _repo.User.GetSingleAsync(c => c.Email == user.Email);
        if (findUser == null) return new LoginResultModel
        {
          Success = false,
          Message = "Invalid e-mail/password",
          Token = string.Empty
        };
        var result = await _signInManager.CheckPasswordSignInAsync(findUser, user.Password, false);
        if (result.Succeeded)
        {
          /* var claims = new List<Claim>
            {
                new Claim("Name", findUser.FirstName+" "+ findUser.LastName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("UserID", findUser.Id, "string"),
            };
          await _userManager.RemoveClaimsAsync(findUser, claims);
          await _userManager.AddClaimsAsync(findUser, claims);
          var claimsPrincipal = await _signInManager.CreateUserPrincipalAsync(findUser);
          await _signInManager.RefreshSignInAsync(findUser); */
          var token = BuildToken(findUser);
          return new LoginResultModel
          {
            Success = true,
            Message = "User successfully signed in",
            Token = token
          };
        }
        return new LoginResultModel
        {
          Success = false,
          Message = "Invalid e-mail/password",
          Token = string.Empty
        };
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task<ChangePasswordResultModel> ChangePasswordAsync(ChangePasswordRequestModel data)
    {
      try
      {
        var user = await _repo.User.GetSingleAsync(c => c.Email == data.Email);
        if (user == null) throw new NullReferenceException("Invalid user");
        var result = await _userManager.ChangePasswordAsync(user, data.OldPassword, data.NewPassword);
        if (result.Succeeded)
        {
          return new ChangePasswordResultModel
          {
            Success = true,
            Message = "Password successfully changed"
          };
        }
        return new ChangePasswordResultModel
        {
          Success = false,
          Message = result.Errors.First().Description
        };
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task<string> ForgotPasswordAsync(ForgotPasswordRequestModel data)
    {
      try
      {
        var user = await _repo.User.GetSingleAsync(c => c.Email == data.Email);
        if (user == null) throw new NullReferenceException("Invalid user");
        var result = await _userManager.GeneratePasswordResetTokenAsync(user);
        return result;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public Task<UserDTO> GetByIdAsync(string Id)
    {
      throw new NotImplementedException();
    }

    public async Task<RegisterResultModel> RegisterAsync(UserDTO user)
    {
      try
      {
        var newUser = new User
        {
          FirstName = user.FirstName,
          LastName = user.LastName,
          Email = user.Email,
          UserName = user.Email
        };
        var result = await _userManager.CreateAsync(newUser, user.Password);
        if (result.Succeeded)
        {
          var finUser = await _repo.User.GetSingleAsync(c => c.Email == user.Email);
          return new RegisterResultModel
          {
            Success = true,
            Message = "User successfully registered",
            User = new UserDTO
            {
              FirstName = finUser.FirstName,
              LastName = finUser.LastName,
              Email = finUser.Email
            }
          };
        }
        return new RegisterResultModel
        {
          Success = false,
          Message = result.Errors.First().Description,
          User = null
        };
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task<ResetPasswordResultModel> ResetPasswordAsync(ResetPasswordRequestModel data)
    {
      try
      {
        var user = await _repo.User.GetSingleAsync(c => c.Email == data.Email);
        if (user == null) throw new NullReferenceException("User not found");
        var result = await _userManager.ResetPasswordAsync(user, data.Code, data.NewPassword);
        if (result.Succeeded)
        {
          return new ResetPasswordResultModel
          {
            Success = true,
            Message = "Password reset success"
          };
        }
        return new ResetPasswordResultModel
        {
          Success = false,
          Message = result.Errors.First().Description
        };
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }
  }
}