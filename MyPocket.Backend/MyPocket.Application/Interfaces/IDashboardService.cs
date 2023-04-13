using MyPocket.Application.DTO;
using MyPocket.Domain.Models;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Interfaces
{
  public interface IDashboardService
  {
    List<AmountByCategoryModel> MonthlyAmountByCategory(string UserId, DateTime Month, CategoryType type);
    decimal IncomeByMonth(string UserId, DateTime Month);
    decimal ExpensesByMonth(string UserId, DateTime Month);
    List<MonthTransaction> MonthTransactions(string UserId, DateTime Month, CategoryType type);
    List<ResultByMonth> ResultByMonth(string UserID, DateTime Month);
  }
}