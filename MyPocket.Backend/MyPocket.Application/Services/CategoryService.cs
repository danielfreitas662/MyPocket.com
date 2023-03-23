using MyPocket.Application.DTO;
using MyPocket.Application.Interfaces;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Services
{
  public class CategoryService : ICategoryService
  {
    private readonly IRepositories _repo;
    public CategoryService(IRepositories repo)
    {
      _repo = repo;
    }
    public async Task<CategoryDTO> AddAsync(UserData user, CategoryDTO category)
    {
      try
      {
        var newCategory = _repo.Category.Add(new Category
        {
          Name = category.Name,
          UserId = category.UserId,
        });
        await _repo.SaveAsync();
        return new CategoryDTO
        {
          Name = newCategory.Name,
          UserId = newCategory.UserId,
          Id = newCategory.Id,
        };
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public PaginationResult<CategoryDTO> Filter(PaginationRequest<CategoryDTO> data, UserData user)
    {
      throw new NotImplementedException();
    }

    public List<CategoryDTO> GetAll(string UserId)
    {
      try
      {
        var result = _repo.Category.Get(c => c.UserId == UserId).Select(c => new CategoryDTO
        {
          Name = c.Name,
          UserId = c.UserId,
          Id = c.Id
        });
        return result.ToList();
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task<CategoryDTO?> GetByIdAsync(string UserId, Guid Id)
    {
      try
      {
        var result = await _repo.Category.GetSingleAsync(c => c.Id == Id && c.UserId == UserId);
        if (result == null) return null;
        return new CategoryDTO
        {
          Name = result.Name,
          UserId = result.UserId,
          Id = result.Id
        };
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task RemoveAsync(UserData user, CategoryDTO category)
    {
      try
      {
        var entity = await _repo.Category.GetSingleAsync(c => c.Id == category.Id && c.UserId == user.UserId);
        if (entity == null) throw new NullReferenceException("Invalid category");
        _repo.Category.Remove(entity);
        await _repo.SaveAsync();
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task RemoveRangeAsync(UserData user, List<Guid> ids)
    {
      try
      {
        var categorys = _repo.Category.Get(c => c.UserId == user.UserId && ids.Contains(c.Id));
        _repo.Category.RemoveRange(categorys);
        await _repo.SaveAsync();
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task<CategoryDTO> UpdateAsync(UserData User, CategoryDTO category, CategoryDTO values)
    {
      try
      {
        var entity = await _repo.Category.GetSingleAsync(c => c.Id == category.Id);
        _repo.Category.Update(entity, values);
        await _repo.SaveAsync();
        return values;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }
  }
}