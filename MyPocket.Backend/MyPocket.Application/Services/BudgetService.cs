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
        var category = await _repo.Category.GetSingleAsync(c => c.Id == budget.CategoryId);
        if (category == null) throw new NullReferenceException("Invalid Category");
        var newBudget = _repo.Budget.Add(new Budget
        {
          Amount = budget.Amount,
          CategoryId = budget.CategoryId,
          Month = budget.Month
        });
        await _repo.SaveAsync();

        return new BudgetDTO
        {
          Amount = newBudget.Amount,
          Month = newBudget.Month,
          Category = category.Name,
          CategoryId = newBudget.CategoryId,
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
        var result = _repo.Budget.Get(c => c.Category.UserId == UserId, include: c => c.Include(d => d.Category)).Select(c => new BudgetDTO
        {
          Amount = c.Amount,
          CategoryId = c.CategoryId,
          Month = c.Month,
          Category = c.Category.Name,
          Id = c.Id
        });
        return result.ToList();
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task<BudgetDTO?> GetByIdAsync(string UserId, Guid Id)
    {
      try
      {
        var result = await _repo.Budget.GetSingleAsync(c => c.Id == Id && c.Category.UserId == UserId, include: c => c.Include(d => d.Category));
        if (result == null) return null;
        return new BudgetDTO
        {
          Amount = result.Amount,
          Month = result.Month,
          Category = result.Category.Name,
          Id = result.Id
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
        var entity = await _repo.Budget.GetSingleAsync(c => c.Id == Budget.Id && c.Category.UserId == user.UserId, include: c => c.Include(d => d.Category));
        if (entity == null) throw new NullReferenceException("Invalid Budget");
        _repo.Budget.Remove(entity);
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
        var Budgets = _repo.Budget.Get(c => c.Category.UserId == user.UserId && ids.Contains(c.Id), include: c => c.Include(d => d.Category));
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
  }
}