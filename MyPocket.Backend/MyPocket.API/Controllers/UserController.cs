using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MyPocket.Application.Interfaces;
using MyPocket.Infra.Data.Context;
using MyPocket.Application.DTO;

namespace MyPocket.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class UserController : ControllerBase
  {
    protected readonly IApplicationService _application;
    public UserController(IApplicationService application)
    {
      _application = application;
    }
    [HttpPost("Authenticate")]
    [AllowAnonymous]
    public async Task<ActionResult> Authenticate([FromBody] LoginModel data)
    {
      var result = await _application.User.AuthenticateAsync(data);
      if (result.Success)
      {
        return Ok(result.Token);
      }
      return BadRequest(result.Message);
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
      await _application.User.ForgotPasswordAsync(data);
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
  }
}