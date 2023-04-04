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
  public class CategoryController : ControllerBase
  {
    protected readonly IApplicationService _application;
    public CategoryController(IApplicationService application)
    {
      _application = application;
    }
    [HttpGet]
    public ActionResult GetAll()
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var categories = _application.Category.GetAll(user.UserId);
      return Ok(categories);
    }
    [HttpGet("{Id}")]
    public async Task<ActionResult<CategoryDTO>> GetById([FromRoute] string Id)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var category = await _application.Category.GetByIdAsync(user.UserId, Id);
      if (category == null) return NotFound($"Category Id: {Id} not found");
      return Ok(category);
    }
    [HttpPost]
    public async Task<ActionResult> AddOrUpdate([FromBody] CategoryDTO category)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      if (string.IsNullOrEmpty(category.Id))
      {
        var newCategory = await _application.Category.AddAsync(user, category);
        return Ok(new AddOrUpdateResult<CategoryDTO>
        {
          Entity = newCategory,
          New = true
        });
      }
      else
      {
        var findCategory = await _application.Category.GetByIdAsync(user.UserId, category.Id);
        if (findCategory == null) return NotFound($"Category Id: {category.Id} not found");
        var updatedCategory = await _application.Category.UpdateAsync(user, findCategory, category);
        return Ok(new AddOrUpdateResult<CategoryDTO>
        {
          Entity = updatedCategory,
          New = false
        });
      }
    }
    [HttpDelete("{Id}")]
    public async Task<ActionResult> Remove([FromRoute] string Id)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var category = await _application.Category.GetByIdAsync(user.UserId, Id);
      if (category == null) return NotFound($"Category Id: {Id} not found");
      await _application.Category.RemoveAsync(user, category);
      return Ok(Id);
    }

    [HttpDelete("RemoveRange")]
    public async Task<ActionResult> RemoveRange([FromBody] RemoveRangeModel data)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      await _application.Category.RemoveRangeAsync(user, data.Ids);
      return Ok(data.Ids);
    }
    [HttpPost("Filter")]
    public ActionResult Filter([FromBody] PaginationRequest<CategoryDTO> data)
    {
      var user = HttpContext.User.Identity!.GetUserData();
      var result = _application.Category.Filter(data, user);
      return Ok(result);
    }
  }
}