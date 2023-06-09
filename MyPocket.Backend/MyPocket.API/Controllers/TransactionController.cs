using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MyPocket.Application.Interfaces;
using MyPocket.Infra.Data.Context;
using MyPocket.Application.DTO;
using MyPocket.Domain.Models;
using Microsoft.Extensions.Localization;

namespace MyPocket.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class TransactionController : ControllerBase
  {
    protected readonly IApplicationService _application;
    private readonly IStringLocalizer<TransactionController> _localizer;
    public TransactionController(IApplicationService application, IStringLocalizer<TransactionController> localizer)
    {
      _application = application;
      _localizer = localizer;
    }
    [HttpGet]
    public ActionResult GetAll()
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var transactions = _application.Transaction.GetAll(user.UserId);
      return Ok(transactions);
    }
    [HttpGet("{Id}")]
    public async Task<ActionResult<TransactionDTO>> GetById([FromRoute] string Id)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var transaction = await _application.Transaction.GetByIdAsync(user.UserId, Id);
      if (transaction == null) return NotFound(string.Format(_localizer["Transaction Id: {0} not found"].Value, Id));
      return Ok(transaction);
    }
    [HttpPost]
    public async Task<ActionResult> AddOrUpdate([FromBody] TransactionDTO transaction)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      if (string.IsNullOrEmpty(transaction.Id))
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
        var findTransaction = await _application.Transaction.GetByIdAsync(user.UserId, transaction.Id);
        if (findTransaction == null) return NotFound(string.Format(_localizer["Transaction Id: {0} not found"].Value, transaction.Id));
        var updatedTransaction = await _application.Transaction.UpdateAsync(user, findTransaction, transaction);
        return Ok(new AddOrUpdateResult<TransactionDTO>
        {
          Entity = updatedTransaction,
          New = false
        });
      }
    }
    [HttpDelete("{Id}")]
    public async Task<ActionResult> Remove([FromRoute] string Id)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var transaction = await _application.Transaction.GetByIdAsync(user.UserId, Id);
      if (transaction == null) return NotFound(string.Format(_localizer["Transaction Id: {0} not found"].Value, Id));
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
    public ActionResult Filter([FromBody] PaginationRequest<TransactionWithRelated> data)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var result = _application.Transaction.Filter(data, user);
      return Ok(result);
    }
    [HttpGet("AmountByCategoryByMonth/{month}/{type}")]
    public ActionResult AmountByCategoryByMonth([FromRoute] DateTime Month, [FromRoute] CategoryType type)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var result = _application.Dashboard.MonthlyAmountByCategory(user.UserId, Month, type);
      return Ok(result);
    }
    [HttpGet("IncomeByMonth/{month}")]
    public ActionResult IncomeByMonth([FromRoute] DateTime Month)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var result = _application.Dashboard.IncomeByMonth(user.UserId, Month);
      return Ok(result);
    }
    [HttpGet("ExpensesByMonth/{month}")]
    public ActionResult ExpensesByMonth([FromRoute] DateTime Month)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var result = _application.Dashboard.ExpensesByMonth(user.UserId, Month);
      return Ok(result);
    }
    [HttpGet("TransactionsByMonth/{month}/{type}")]
    public ActionResult TransactionsByMonth([FromRoute] DateTime Month, [FromRoute] CategoryType type)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var result = _application.Dashboard.MonthTransactions(user.UserId, Month, type);
      return Ok(result);
    }
    [HttpGet("ResultsByMonth/{month}")]
    public ActionResult ResultsByMonth([FromRoute] DateTime Month)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var result = _application.Dashboard.ResultByMonth(user.UserId, Month);
      return Ok(result);
    }
  }
}