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
    public List<AmountByCategoryModel> AmountByCategoryByMonth(string userId, DateTime month, CategoryType type)
    {
      var result = _context.Transactions.Include(c => c.Category).Where(c => c.UserId == userId && c.Category.Type == type).GroupBy(c => new { c.Category.Name }).Select(c => new AmountByCategoryModel
      {
        Category = c.Key.Name,
        Amount = c.Where(d => d.Date.Month == month.Month && d.Date.Year == month.Year).Sum(d => d.Amount)
      });
      return result.ToList();
    }
    public List<MonthTransaction> MonthTransactionAmount(string userId, DateTime month, CategoryType type)
    {
      var result = _context.Transactions.Include(c => c.Category).Where(c => c.UserId == userId && c.Date.Month == month.Month && c.Date.Year == month.Year && c.Category.Type == type).GroupBy(c => new { c.Date.Month, c.Date.Year, c.Date.Day }).Select(c => new MonthTransaction
      {
        Date = new DateTime(c.Key.Year, c.Key.Month, c.Key.Day),
        Amount = c.Sum(d => d.Amount)
      });
      return result.OrderBy(c => c.Date).ToList();
    }
    public List<ResultByMonth> ResultByMonth(string userId, DateTime month)
    {
      DateTime start = new DateTime(month.Year, month.Month, 1).AddMonths(-3).ToUniversalTime();
      DateTime end = new DateTime(month.Year, month.Month, 1).AddMonths(4).AddDays(-1).ToUniversalTime();
      var result = _context.Transactions.Include(d => d.Category).Where(c => c.UserId == userId && c.Date >= start && c.Date <= end).GroupBy(c => new { c.Date.Month, c.Date.Year }).Select(c => new ResultByMonth
      {
        Date = new DateTime(c.Key.Year, c.Key.Month, 1),
        Income = c.Where(d => d.Category.Type == CategoryType.Income).Sum(d => d.Amount),
        Expense = c.Where(d => d.Category.Type == CategoryType.Expense).Sum(d => d.Amount),
        Result = c.Where(d => d.Category.Type == CategoryType.Income).Sum(d => d.Amount) - c.Where(d => d.Category.Type == CategoryType.Expense).Sum(d => d.Amount)
      });
      return result.OrderBy(c => c.Date).ToList();
    }
    public PaginationResult<TransactionWithRelated> Filter(PaginationRequest<TransactionWithRelated> filters, string userId)
    {
      try
      {
        var results = _context.Transactions
        .Include(c => c.Category)
        .Include(c => c.Account)
        .Where(c => c.UserId == userId);

        if (!string.IsNullOrEmpty(filters.Filters.Description))
        {
          results = results.Where(c => c.Description.ToLower().Contains(filters.Filters.Description.ToLower()));
        }
        if (filters.Filters.Amount.HasValue)
        {
          results = results.Where(c => c.Amount == filters.Filters.Amount);
        }
        if (!string.IsNullOrEmpty(filters.Filters.Category))
        {
          results = results.Where(c => c.Category.Name.ToLower().Contains(filters.Filters.Category.ToLower()));
        }
        if (!string.IsNullOrEmpty(filters.Filters.Account))
        {
          results = results.Where(c => c.Account.Name.ToLower().Contains(filters.Filters.Account.ToLower()));
        }
        if (filters.Filters.Date.HasValue)
        {
          results = results.Where(c => c.Date.Year == filters.Filters.Date.Value.Year && c.Date.Month == filters.Filters.Date.Value.Month && c.Date.Day == filters.Filters.Date.Value.Day);
        }

        if (filters.Sorter != null)
        {
          if (filters.Sorter.Field == "date")
          {
            if (filters.Sorter.Order == "asc") results = results.OrderBy(c => c.Date);
            else results = results.OrderByDescending(c => c.Date);
          }
          if (filters.Sorter.Field == "amount")
          {
            if (filters.Sorter.Order == "asc") results = results.OrderBy(c => c.Amount);
            else results = results.OrderByDescending(c => c.Amount);
          }
          if (filters.Sorter.Field == "category")
          {
            if (filters.Sorter.Order == "asc") results = results.OrderBy(c => c.Category.Name);
            else results = results.OrderByDescending(c => c.Category.Name);
          }
          if (filters.Sorter.Field == "account")
          {
            if (filters.Sorter.Order == "asc") results = results.OrderBy(c => c.Account.Name);
            else results = results.OrderByDescending(c => c.Account.Name);
          }
          if (filters.Sorter.Field == "description")
          {
            if (filters.Sorter.Order == "asc") results = results.OrderBy(c => c.Description);
            else results = results.OrderByDescending(c => c.Description);
          }
        }
        else results = results.OrderByDescending(c => c.Date);
        var total = results.Count();
        var pages = Math.Ceiling(Convert.ToDouble(total) / filters.Pagination.PageSize);
        var current = filters.Pagination.Current > pages ? pages : filters.Pagination.Current;
        var results2 = results.Skip(filters.Pagination.Current * filters.Pagination.PageSize - filters.Pagination.PageSize).Take(filters.Pagination.PageSize).Select(c => new TransactionWithRelated
        {
          Id = c.Id,
          Description = c.Description,
          Date = c.Date,
          Amount = c.Amount,
          Category = c.Category.Name,
          Account = c.Account.Name
        });
        return new PaginationResult<TransactionWithRelated>
        {
          Results = results2.ToList(),
          Total = total,
          Current = Convert.ToInt32(current) == 0 ? 1 : Convert.ToInt32(current)
        };
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }
  }
}