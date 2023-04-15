using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MyPocket.Application.Interfaces;
using MyPocket.Infra.Data.Context;
using MyPocket.Application.DTO;
using System.Configuration;

namespace MyPocket.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class UserController : ControllerBase
  {

    protected readonly IApplicationService _application;
    protected readonly IConfiguration _config;
    public UserController(IApplicationService application, IConfiguration config)
    {
      _application = application;
      _config = config;
    }
    [HttpPost("Authenticate")]
    [AllowAnonymous]
    public async Task<ActionResult> Authenticate([FromBody] LoginModel data)
    {
      var result = await _application.User.AuthenticateAsync(data);
      if (result.Success)
      {
        return Ok(result);
      }
      return BadRequest(result);
    }
    [HttpPatch]
    public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordRequestModel data)
    {
      var result = await _application.User.ChangePasswordAsync(data);
      if (result.Success)
      {
        return Ok(result.Message);
      }
      return BadRequest(result.Message);
    }
    [HttpPost]
    [AllowAnonymous]
    public async Task<ActionResult> Register([FromBody] UserDTO data)
    {
      var result = await _application.User.RegisterAsync(data);
      if (result.Success)
      {
        return Ok(result.Message);
      }
      return BadRequest(result.Message);
    }
    [HttpPost("ForgotPassword")]
    [AllowAnonymous]
    public async Task<ActionResult> ForgotPassword([FromBody] ForgotPasswordRequestModel data)
    {
      string token = await _application.User.ForgotPasswordAsync(data);
      string domain = _config["domain"];
      string body = $"<p>Click <a href=\"{domain}?token={token}\">here</a> to create e new password</p>";
      await _application.EmailService.SendEmail(new List<string>() { data.Email }, "Password Reset Requested", body);
      return Ok("Instructions have been sent to the informed e-mail");
    }
    [HttpPost("ResetPassword")]
    [AllowAnonymous]
    public async Task<ActionResult> ResetPassword([FromBody] ResetPasswordRequestModel data)
    {
      var result = await _application.User.ResetPasswordAsync(data);
      if (result.Success)
      {
        return Ok(result.Message);
      }
      return BadRequest(result.Message);
    }
    [HttpGet("GetUser")]
    public async Task<ActionResult> GetUser()
    {
      var userData = HttpContext.User.Identity!.GetUserData();
      var user = await _application.User.GetByIdAsync(userData.UserId);
      return Ok(new UserDTO
      {
        FirstName = user.FirstName,
        LastName = user.LastName,
        Email = user.Email
      });
    }
  }
}