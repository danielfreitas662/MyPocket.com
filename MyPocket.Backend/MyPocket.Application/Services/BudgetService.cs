using MyPocket.Application.DTO;
using MyPocket.Application.Interfaces;
using MyPocket.Domain.Interfaces;
using MyPocket.Infra.Data.Context;
using MyPocket.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace MyPocket.Application.Services
{
  public class BudgetService : IBudgetService
  {
    private readonly IRepositories _repo;
    public BudgetService(IRepositories repo)
    {
      _repo = repo;
    }

    public async Task<BudgetDTO> AddAsync(UserData user, BudgetDTO budget)
    {
      try
      {
        var newBudget = _repo.Budget.Add(new Budget
        {
          Id = Guid.NewGuid().ToString(),
          Month = budget.Month
        });
        await _repo.SaveAsync();

        return new BudgetDTO
        {
          Month = newBudget.Month,
          Id = newBudget.Id,
        };
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public PaginationResult<BudgetDTO> Filter(PaginationRequest<BudgetDTO> data, UserData user)
    {
      throw new NotImplementedException();
    }

    public List<BudgetDTO> GetAll(string UserId)
    {
      try
      {
        var result = _repo.Budget.Get(c => c.UserId == UserId, include: c => c.Include(d => d.Items).Include(d => d.Items).ThenInclude(d => d.Category)).Select(c => new BudgetDTO
        {
          Amount = c.Items.Sum(d => d.Amount),
          Month = c.Month,
          Id = c.Id,
          Items = c.Items.Select(d => new BudgetItemDTO
          {
            Id = d.Id,
            Amount = d.Amount,
            Category = d.Category.Name,
            CategoryId = d.CategoryId
          }).ToList()
        });
        return result.ToList();
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task<BudgetDTO?> GetByIdAsync(string UserId, string Id)
    {
      try
      {
        var result = await _repo.Budget.GetSingleAsync(c => c.Id == Id && c.UserId == UserId, include: c => c.Include(d => d.Items).ThenInclude(d => d.Category));
        if (result == null) return null;
        return new BudgetDTO
        {
          Amount = result.Items.Sum(c => c.Amount),
          Month = result.Month,
          Id = result.Id,
          Items = result.Items.Select(c => new BudgetItemDTO
          {
            Id = c.Id,
            Amount = c.Amount,
            Category = c.Category.Name,
            CategoryId = c.CategoryId
          }).ToList()
        };
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task RemoveAsync(UserData user, BudgetDTO Budget)
    {
      try
      {
        var entity = await _repo.Budget.GetSingleAsync(c => c.Id == Budget.Id && c.UserId == user.UserId);
        if (entity == null) throw new NullReferenceException("Invalid Budget");
        _repo.Budget.Remove(entity);
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
        var Budgets = _repo.Budget.Get(c => c.UserId == user.UserId && ids.Contains(c.Id));
        _repo.Budget.RemoveRange(Budgets);
        await _repo.SaveAsync();
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task<BudgetDTO> UpdateAsync(UserData User, BudgetDTO Budget, BudgetDTO values)
    {
      try
      {
        var entity = await _repo.Budget.GetSingleAsync(c => c.Id == Budget.Id);
        _repo.Budget.Update(entity, values);
        await _repo.SaveAsync();
        return values;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }
    public List<BudgetItemDTO> GetItems(string budgetId, string userId)
    {
      try
      {
        var results = _repo.BudgetItem.Get(c => c.BudgetId == budgetId && c.Budget.UserId == userId, include: c => c.Include(d => d.Category).Include(d => d.Budget)).Select(c => new BudgetItemDTO
        {
          Amount = c.Amount,
          BudgetId = c.BudgetId,
          Category = c.Category.Name,
          Month = c.Budget.Month,
          Id = c.Id
        }).ToList();
        return results;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }
    public async Task<BudgetItemDTO> AddItemAsync(BudgetItemDTO item, string userId)
    {
      try
      {
        var budget = await _repo.Budget.GetSingleAsync(c => c.Id == item.BudgetId);
        if (budget == null) throw new NullReferenceException("Invalid budget");
        var category = await _repo.Category.GetSingleAsync(c => c.Id == item.CategoryId);
        if (category == null) throw new NullReferenceException("Invalid category");
        var newItem = _repo.BudgetItem.Add(new BudgetItem
        {
          Id = Guid.NewGuid().ToString(),
          Amount = item.Amount,
          CategoryId = item.CategoryId,
          Category = category,
          Budget = budget,
          BudgetId = item.BudgetId
        });
        await _repo.SaveAsync();
        return new BudgetItemDTO
        {
          Id = newItem.Id,
          Amount = newItem.Amount,
          Month = budget.Month,
          Category = category.Name,
          CategoryId = item.CategoryId,
          BudgetId = item.BudgetId
        };
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }
    public async Task<string> RemoveItemAsync(string itemId, string userId)
    {
      try
      {
        var item = await _repo.BudgetItem.GetSingleAsync(c => c.Id == itemId && c.Budget.UserId == userId, include: c => c.Include(d => d.Budget));
        if (item == null) throw new NullReferenceException("Item not found");
        _repo.BudgetItem.Remove(item);
        await _repo.SaveAsync();
        return itemId;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }
    public async Task<BudgetItemDTO> UpdateItemAsync(BudgetItemDTO item, string userId)
    {
      try
      {
        var itemFind = await _repo.BudgetItem.GetSingleAsync(c => c.Id == item.Id && c.Budget.UserId == userId, include: c => c.Include(d => d.Budget));
        if (itemFind == null) throw new NullReferenceException("Item not found");
        var category = await _repo.Category.GetSingleAsync(c => c.Id == item.CategoryId && c.UserId == userId);
        if (category == null) throw new NullReferenceException("Invalid category");
        var budget = await _repo.Budget.GetSingleAsync(c => c.Id == item.BudgetId && c.UserId == userId);
        if (budget == null) throw new NullReferenceException("Invalid budget");
        itemFind.Amount = item.Amount;
        itemFind.CategoryId = item.CategoryId;
        itemFind.Category = category;
        _repo.BudgetItem.SetState(itemFind, EntityState.Modified);
        await _repo.SaveAsync();
        return new BudgetItemDTO
        {
          Id = itemFind.Id,
          Amount = itemFind.Amount,
          Month = budget.Month,
          Category = category.Name,
          CategoryId = itemFind.CategoryId,
          BudgetId = itemFind.BudgetId
        };
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }
  }
}