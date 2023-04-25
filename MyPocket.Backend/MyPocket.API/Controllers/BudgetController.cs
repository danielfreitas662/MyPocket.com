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
  public class BudgetController : ControllerBase
  {
    protected readonly IApplicationService _application;
    private readonly IStringLocalizer<BudgetController> _localizer;
    public BudgetController(IApplicationService application, IStringLocalizer<BudgetController> localizer)
    {
      _application = application;
      _localizer = localizer;
    }
    [HttpGet]
    public ActionResult GetAll()
    {

      var user = HttpContext.User.Identity!.GetUserData();
      var budgets = _application.Budget.GetAll(user.UserId);
      return Ok(budgets);
    }

    [HttpGet("{Id}")]
    public async Task<ActionResult<BudgetDTO>> GetById([FromRoute] string Id)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var budget = await _application.Budget.GetByIdAsync(user.UserId, Id);
      if (budget == null) NotFound(string.Format(_localizer["Budget Id: {0} not found"].Value, Id));
      return Ok(budget);
    }
    [HttpGet("Month/{month}")]
    public async Task<ActionResult> GetByMonth([FromRoute] DateTime month)
    {
      Console.WriteLine(month);
      var user = HttpContext.User.Identity!.GetUserData();
      var budget = await _application.Budget.GetByMonthAsync(month, user.UserId);
      return Ok(budget);
    }
    [HttpPost]
    public async Task<ActionResult> AddOrUpdate([FromBody] BudgetDTO budget)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      if (string.IsNullOrEmpty(budget.Id))
      {
        var newBudget = await _application.Budget.AddAsync(user, budget);
        return Ok(new AddOrUpdateResult<BudgetDTO>
        {
          Entity = newBudget,
          New = true
        });
      }
      else
      {
        var findBudget = await _application.Budget.GetByIdAsync(user.UserId, budget.Id);
        if (findBudget == null) return NotFound(string.Format(_localizer["Budget Id: {0} not found"].Value, budget.Id));
        var updatedBudget = await _application.Budget.UpdateAsync(user, findBudget, budget);
        return Ok(new AddOrUpdateResult<BudgetDTO>
        {
          Entity = updatedBudget,
          New = false
        });
      }
    }
    [HttpDelete("{Id}")]
    public async Task<ActionResult> Remove([FromRoute] string Id)
    {
      try
      {
        var user = HttpContext.User.Identity!.GetUserData();
        var budget = await _application.Budget.GetByIdAsync(user.UserId, Id);
        if (budget == null) return NotFound(string.Format(_localizer["Budget Id: {0} not found"].Value, Id));
        await _application.Budget.RemoveAsync(user, budget);
        return Ok(Id);
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }

    [HttpDelete("RemoveRange")]
    public async Task<ActionResult> RemoveRange([FromBody] RemoveRangeModel data)
    {
      try
      {
        var user = HttpContext.User.Identity!.GetUserData();
        await _application.Budget.RemoveRangeAsync(user, data.Ids);
        return Ok(data.Ids);
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }
    [HttpPost("Filter")]
    public ActionResult Filter([FromBody] PaginationRequest<BudgetWithRelated> data)
    {
      try
      {
        var user = HttpContext.User.Identity!.GetUserData();
        var result = _application.Budget.Filter(data, user);
        return Ok(result);
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }
    [HttpGet("GetItems/{budgetId}")]
    public ActionResult GetItems([FromRoute] string budgetId)
    {
      try
      {
        var user = HttpContext.User.Identity!.GetUserData();
        var result = _application.Budget.GetItems(budgetId, user.UserId);
        return Ok(result);
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }
    [HttpPost("AddItem")]
    public async Task<ActionResult> AddItem([FromBody] BudgetItemDTO item)
    {
      try
      {
        var user = HttpContext.User.Identity!.GetUserData();
        var items = _application.Budget.GetItems(item.BudgetId, user.UserId);
        if (items.Any(c => c.CategoryId == item.CategoryId))
        {
          return BadRequest(_localizer["Item already included"].Value);
        }
        var category = await _application.Category.GetByIdAsync(user.UserId, item.CategoryId);
        if (category == null)
        {
          return NotFound(_localizer["Invalid category"].Value);
        }
        var budget = await _application.Budget.GetByIdAsync(user.UserId, item.BudgetId);
        if (budget == null)
        {
          return NotFound(_localizer["Invalid budget"].Value);
        }
        var newitem = await _application.Budget.AddItemAsync(item, user.UserId);
        return Ok(newitem);
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }
    [HttpPatch("UpdateItem")]
    public async Task<ActionResult> UpdateItem([FromBody] BudgetItemDTO item)
    {
      try
      {
        var user = HttpContext.User.Identity!.GetUserData();
        var itemFound = await _application.Budget.GetItemAsync(item.Id, user.UserId);
        if (itemFound == null) return NotFound(_localizer["Item not found"].Value);
        var category = await _application.Category.GetByIdAsync(user.UserId, item.CategoryId);
        if (category == null) return NotFound(_localizer["Invalid category"].Value);
        var budget = await _application.Budget.GetByIdAsync(user.UserId, item.BudgetId);
        if (budget == null) return NotFound(_localizer["Invalid budget"].Value);
        var updatedItem = await _application.Budget.UpdateItemAsync(item, user.UserId);
        return Ok(updatedItem);
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }
    [HttpDelete("RemoveItem/{id}")]
    public async Task<ActionResult> RemoveItem([FromRoute] string id)
    {
      try
      {
        var user = HttpContext.User.Identity!.GetUserData();
        var item = await _application.Budget.GetItemAsync(id, user.UserId);
        if (item == null) return NotFound(_localizer["Item not found"].Value);
        var result = await _application.Budget.RemoveItemAsync(id, user.UserId);
        return Ok(result);
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }
  }
}