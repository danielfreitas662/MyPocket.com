using MyPocket.Infra.Data.Context;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;

namespace MyPocket.Infra.Repository
{
  public class AccountRepository : BaseRepository<Account>, IAccountRepository
  {
    private readonly MyPocketDBContext _context;
    public AccountRepository(MyPocketDBContext context) : base(context)
    {
      _context = context;
    }
    public PaginationResult<AccountWithRelated> Filter(PaginationRequest<AccountWithRelated> filters, string userId)
    {
      try
      {
        var results = _context.Accounts
        .Where(c => c.UserId == userId);

        if (!string.IsNullOrEmpty(filters.Filters.Name))
        {
          results = results.Where(c => c.Name.ToLower().Contains(filters.Filters.Name.ToLower()));
        }

        if (filters.Sorter != null)
        {
          if (filters.Sorter.Field == "name")
          {
            if (filters.Sorter.Order == "asc") results = results.OrderBy(c => c.Name);
            else results = results.OrderByDescending(c => c.Name);
          }
        }
        var total = results.Count();
        var pages = Math.Ceiling(Convert.ToDouble(total) / filters.Pagination.PageSize);
        var current = filters.Pagination.Current > pages ? pages : filters.Pagination.Current;
        var results2 = results.Skip(filters.Pagination.Current * filters.Pagination.PageSize - filters.Pagination.PageSize).Take(filters.Pagination.PageSize).Select(c => new AccountWithRelated
        {
          Id = c.Id,
          Name = c.Name,
        });
        return new PaginationResult<AccountWithRelated>
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