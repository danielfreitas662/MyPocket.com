using MyPocket.Application.DTO;
using MyPocket.Domain.Models;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Interfaces
{
  public interface IDashboardService
  {
    List<AmountByCategoryModel> MonthlyAmountByCategory(string UserId, DateTime Month);
  }
}