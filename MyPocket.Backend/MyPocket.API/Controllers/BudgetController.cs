using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MyPocket.Application.Interfaces;
using MyPocket.Infra.Data.Context;
using MyPocket.Application.DTO;
using MyPocket.Domain.Models;

namespace MyPocket.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class BudgetController : ControllerBase
  {
    protected readonly IApplicationService _application;
    public BudgetController(IApplicationService application)
    {
      _application = application;
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
      if (budget == null) return NotFound($"Budget Id: {Id} not found");
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
        if (findBudget == null) return NotFound($"Budget Id: {budget.Id} not found");
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
        if (budget == null) return NotFound($"Budget Id: {Id} not found");
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
    public ActionResult Filter([FromBody] PaginationRequest<BudgetDTO> data)
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