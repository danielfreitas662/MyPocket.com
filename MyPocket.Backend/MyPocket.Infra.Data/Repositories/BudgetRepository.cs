using MyPocket.Infra.Data.Context;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;

namespace MyPocket.Infra.Repository
{
  public class BudgetRepository : BaseRepository<Budget>, IBudgetRepository
  {
    private readonly MyPocketDBContext _context;
    public BudgetRepository(MyPocketDBContext context) : base(context)
    {
      _context = context;
    }
    public PaginationResult<BudgetWithRelated> Filter(PaginationRequest<BudgetWithRelated> filters, string userId)
    {
      try
      {
        var results = _context.Budgets
        .Where(c => c.UserId == userId);

        if (filters.Filters.Month.HasValue)
        {
          results = results.Where(c => c.Month.Year == filters.Filters.Month.Value.Year && c.Month.Month == filters.Filters.Month.Value.Month);
        }
        if (filters.Sorter != null)
        {
          if (filters.Sorter.Field == "month")
          {
            if (filters.Sorter.Order == "asc") results = results.OrderBy(c => c.Month);
            else results = results.OrderByDescending(c => c.Month);
          }
          if (filters.Sorter.Field == "amount")
          {
            if (filters.Sorter.Order == "asc") results = results.OrderBy(c => c.Items.Sum(d => d.Amount));
            else results = results.OrderByDescending(c => c.Items.Sum(d => d.Amount));
          }
          if (filters.Sorter.Field == "actual")
          {
            if (filters.Sorter.Order == "asc") results = results.OrderBy(c => c.Items.SelectMany(d => d.Category.Transactions).Sum(d => d.Amount));
            else results = results.OrderByDescending(c => c.Items.SelectMany(d => d.Category.Transactions).Sum(d => d.Amount));
          }
        }
        else results = results.OrderByDescending(c => c.Month);
        var total = results.Count();
        var pages = Math.Ceiling(Convert.ToDouble(total) / filters.Pagination.PageSize);
        var current = filters.Pagination.Current > pages ? pages : filters.Pagination.Current;
        var results2 = results.Skip(filters.Pagination.Current * filters.Pagination.PageSize - filters.Pagination.PageSize).Take(filters.Pagination.PageSize).Select(c => new BudgetWithRelated
        {
          Id = c.Id,
          Month = c.Month,
          Amount = c.Items.Sum(d => d.Amount),
          Actual = c.Items.SelectMany(d => d.Category.Transactions).Sum(d => d.Amount),
        });
        return new PaginationResult<BudgetWithRelated>
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