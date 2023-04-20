using Microsoft.EntityFrameworkCore;
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
          Id = Guid.NewGuid().ToString(),
          Name = category.Name,
          Type = category.Type,
          UserId = user.UserId,
        });
        await _repo.SaveAsync();
        return new CategoryDTO
        {
          Name = newCategory.Name,
          UserId = newCategory.UserId,
          Type = category.Type,
          Id = newCategory.Id,
        };
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public PaginationResult<CategoryWithRelated> Filter(PaginationRequest<CategoryWithRelated> data, UserData user)
    {
      try
      {
        var result = _repo.Category.Filter(data, user.UserId);
        return result;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public List<CategoryDTO> GetAll(string UserId)
    {
      try
      {
        var result = _repo.Category.Get(c => c.UserId == UserId).Select(c => new CategoryDTO
        {
          Name = c.Name,
          Type = c.Type,
          UserId = c.UserId,
          Id = c.Id.ToString()
        });
        return result.ToList();
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task<CategoryDTO?> GetByIdAsync(string UserId, string Id)
    {
      try
      {
        var result = await _repo.Category.GetSingleAsync(c => c.Id == Id && c.UserId == UserId);
        if (result == null) return null;
        return new CategoryDTO
        {
          Name = result.Name,
          Type = result.Type,
          UserId = result.UserId,
          Id = result.Id.ToString()
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

    public async Task RemoveRangeAsync(UserData user, List<string> ids)
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
    public List<CategoryExpenseBudgetDTO> GetExpensesAndBudgets(DateTime month, string userId)
    {
      try
      {
        var categories = _repo.Category.Get(c => c.UserId == userId && c.Type == CategoryType.Expense && c.Transactions.Any(d => d.Date.Month == month.Month && d.Date.Year == month.Year), include: c => c.Include(d => d.Transactions)).Select(c => new CategoryExpensesDTO
        {
          Id = c.Id,
          Category = c.Name,
          Expenses = c.Transactions.Sum(d => d.Amount)
        });
        var budgets = _repo.BudgetItem.Get(c => c.Budget.UserId == userId && c.Budget.Month.Month == month.Month && c.Budget.Month.Year == month.Year, include: c => c.Include(d => d.Budget)).Select(c => new BudgetItemDTO
        {
          CategoryId = c.CategoryId,
          Amount = c.Amount
        });
        List<CategoryExpenseBudgetDTO> result = categories.Select(c => new CategoryExpenseBudgetDTO
        {
          Id = c.Id,
          Category = c.Category,
          Expenses = c.Expenses,
          Budget = budgets.Where(d => d.CategoryId == c.Id).Sum(d => d.Amount.Value)
        }).ToList();
        return result;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }
  }
}