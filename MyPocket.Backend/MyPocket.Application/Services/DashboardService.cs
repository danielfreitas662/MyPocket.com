using Microsoft.EntityFrameworkCore;
using MyPocket.Application.DTO;
using MyPocket.Application.Interfaces;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Services
{
  public class DashboardService : IDashboardService
  {
    private readonly IRepositories _repo;
    public DashboardService(IRepositories repo)
    {
      _repo = repo;
    }
    public List<AmountByCategoryModel> MonthlyAmountByCategory(string UserId, DateTime Month, CategoryType type)
    {
      try
      {
        var result = _repo.Transaction.AmountByCategoryByMonth(UserId, Month, type);
        return result;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }
    public decimal IncomeByMonth(string UserId, DateTime Month)
    {
      try
      {
        var result = _repo.Transaction.Get(c => c.UserId == UserId && c.Date.Month == Month.Month && c.Date.Year == Month.Year && c.Category.Type == CategoryType.Income, include: c => c.Include(d => d.Category)).Sum(c => c.Amount);
        return result;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }
    public decimal OutcomeByMonth(string UserId, DateTime Month)
    {
      try
      {
        var result = _repo.Transaction.Get(c => c.UserId == UserId && c.Date.Month == Month.Month && c.Date.Year == Month.Year && c.Category.Type == CategoryType.Outcome, include: c => c.Include(d => d.Category)).Sum(c => c.Amount);
        return result;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }
    public List<MonthTransaction> MonthTransactions(string UserId, DateTime Month, CategoryType type)
    {
      try
      {
        var result = _repo.Transaction.MonthTransactionAmount(UserId, Month, type);
        return result;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }
    public List<ResultByMonth> ResultByMonth(string UserID, DateTime Month)
    {
      try
      {
        var result = _repo.Transaction.ResultByMonth(UserID, Month);
        return result;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }
  }
}