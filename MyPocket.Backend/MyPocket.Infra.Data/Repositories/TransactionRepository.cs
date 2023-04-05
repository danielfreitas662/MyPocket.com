using MyPocket.Infra.Data.Context;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace MyPocket.Infra.Repository
{

  public class TransactionRepository : BaseRepository<Transaction>, ITransactionRepository
  {
    private readonly MyPocketDBContext _context;
    public TransactionRepository(MyPocketDBContext context) : base(context)
    {
      _context = context;
    }

    public List<Transaction> GetByAccount(Guid UserID)
    {
      throw new NotImplementedException();
    }

    public List<Transaction> GetByCategoryID(Guid UserID, int CategoryID)
    {
      throw new NotImplementedException();
    }
    public List<AmountByCategoryModel> AmountByCategoryByMonth(string userId, DateTime month)
    {
      var result = _context.Transactions.Include(c => c.Category).Where(c => c.UserId == userId).GroupBy(c => new { c.Category.Name }).Select(c => new AmountByCategoryModel
      {
        Category = c.Key.Name,
        Amount = c.Where(d => d.Date.Month == month.Month && d.Date.Year == month.Year && d.Category.Type == CategoryType.Income).Sum(d => d.Amount) - c.Where(d => d.Date.Month == month.Month && d.Date.Year == month.Year && d.Category.Type == CategoryType.Outcome).Sum(d => d.Amount)
      });
      return result.ToList();
    }
    public List<MonthTransaction> MonthTransactionAmount(string userId, DateTime month, CategoryType type)
    {
      var result = _context.Transactions.Include(c => c.Category).Where(c => c.UserId == userId).GroupBy(c => new { c.Date.Month, c.Date.Year, c.Date.Day }).Select(c => new MonthTransaction
      {
        Date = new DateTime(c.Key.Year, c.Key.Month, c.Key.Day),
        Amount = c.Where(d => d.Date.Month == month.Month && d.Date.Year == month.Year && d.Category.Type == type).Sum(d => d.Amount)
      });
      return result.ToList();
    }

  }
}