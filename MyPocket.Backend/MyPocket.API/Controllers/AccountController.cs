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
  public class AccountController : ControllerBase
  {
    protected readonly IApplicationService _application;
    public AccountController(IApplicationService application)
    {
      _application = application;
    }
    [HttpGet]
    public ActionResult GetAll()
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var accounts = _application.Account.GetAll(user.UserId);
      return Ok(accounts);
    }
    [HttpGet("{Id}")]
    public async Task<ActionResult<AccountDTO>> GetById([FromRoute] string Id)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var account = await _application.Account.GetByIdAsync(user.UserId, Id);
      if (account == null) return NotFound($"Account Id: {Id} not found");
      return Ok(account);
    }
    [HttpPost]
    public async Task<ActionResult> AddOrUpdate([FromBody] AccountDTO account)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      if (string.IsNullOrEmpty(account.Id))
      {
        var newAccount = await _application.Account.AddAsync(user, account);
        return Ok(new AddOrUpdateResult<AccountDTO>
        {
          Entity = newAccount,
          New = true
        });
      }
      else
      {
        var findAccount = await _application.Account.GetByIdAsync(user.UserId, account.Id);
        if (findAccount == null) return NotFound($"Account Id: {account.Id} not found");
        var updatedAccount = await _application.Account.UpdateAsync(user, findAccount, account);
        return Ok(new AddOrUpdateResult<AccountDTO>
        {
          Entity = updatedAccount,
          New = false
        });
      }
    }
    [HttpDelete("{Id}")]
    public async Task<ActionResult> Remove([FromRoute] string Id)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var account = await _application.Account.GetByIdAsync(user.UserId, Id);
      if (account == null) return NotFound($"Account Id: {Id} not found");
      await _application.Account.RemoveAsync(user, account);
      return Ok(Id);
    }

    [HttpDelete("RemoveRange")]
    public async Task<ActionResult> RemoveRange([FromBody] RemoveRangeModel data)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      await _application.Account.RemoveRangeAsync(user, data.Ids);
      return Ok(data.Ids);
    }
    [HttpPost("Filter")]
    public ActionResult Filter([FromBody] PaginationRequest<AccountDTO> data)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var result = _application.Account.Filter(data, user);
      return Ok(result);
    }
  }
}