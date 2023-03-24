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
  public class TransactionController : ControllerBase
  {
    protected readonly IApplicationService _application;
    public TransactionController(IApplicationService application)
    {
      _application = application;
    }
    [HttpGet]
    public ActionResult GetAll()
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var transactions = _application.Transaction.GetAll(user.UserId);
      return Ok(transactions);
    }
    [HttpGet("{Id}")]
    public async Task<ActionResult<TransactionDTO>> GetById([FromRoute] Guid Id)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var transaction = await _application.Transaction.GetByIdAsync(user.UserId, Id);
      if (transaction == null) return NotFound($"Transaction Id: {Id} not found");
      return Ok(transaction);
    }
    [HttpPost]
    public async Task<ActionResult> AddOrUpdate([FromBody] TransactionDTO transaction)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      if (!transaction.Id.HasValue)
      {
        var newTransaction = await _application.Transaction.AddAsync(user, transaction);
        return Ok(new AddOrUpdateResult<TransactionDTO>
        {
          Entity = newTransaction,
          New = true
        });
      }
      else
      {
        var findTransaction = await _application.Transaction.GetByIdAsync(user.UserId, transaction.Id.Value);
        if (findTransaction == null) return NotFound($"Transaction Id: {transaction.Id} not found");
        var updatedTransaction = await _application.Transaction.UpdateAsync(user, findTransaction, transaction);
        return Ok(new AddOrUpdateResult<TransactionDTO>
        {
          Entity = updatedTransaction,
          New = false
        });
      }
    }
    [HttpDelete("{Id}")]
    public async Task<ActionResult> Remove([FromRoute] Guid Id)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var transaction = await _application.Transaction.GetByIdAsync(user.UserId, Id);
      if (transaction == null) return NotFound($"Transaction Id: {Id} not found");
      await _application.Transaction.RemoveAsync(user, transaction);
      return Ok(Id);
    }

    [HttpDelete("RemoveRange")]
    public async Task<ActionResult> RemoveRange([FromBody] RemoveRangeModel data)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      await _application.Transaction.RemoveRangeAsync(user, data.Ids);
      return Ok(data.Ids);
    }
    [HttpPost("Filter")]
    public ActionResult Filter([FromBody] PaginationRequest<TransactionDTO> data)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var result = _application.Transaction.Filter(data, user);
      return Ok(result);
    }
  }
}