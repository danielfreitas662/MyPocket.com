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
    public List<AmountByCategoryModel> MonthlyAmountByCategory(string UserId, DateTime Month)
    {
      try
      {
        var result = _repo.Transaction.AmountByCategoryByMonth(UserId, Month);
        return result;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }
  }
}