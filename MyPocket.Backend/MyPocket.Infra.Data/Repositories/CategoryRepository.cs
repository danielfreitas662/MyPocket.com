using MyPocket.Infra.Data.Context;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;

namespace MyPocket.Infra.Repository
{
  public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
  {
    private readonly MyPocketDBContext _context;
    public CategoryRepository(MyPocketDBContext context) : base(context)
    {
      _context = context;
    }
    public PaginationResult<CategoryWithRelated> Filter(PaginationRequest<CategoryWithRelated> filters, string userId)
    {
      try
      {
        var results = _context.Categories
        .Where(c => c.UserId == userId);

        if (!string.IsNullOrEmpty(filters.Filters.Name))
        {
          results = results.Where(c => c.Name.ToLower().Contains(filters.Filters.Name.ToLower()));
        }
        if (filters.Filters.Type.HasValue)
        {
          results = results.Where(c => c.Type == filters.Filters.Type);
        }

        if (filters.Sorter != null)
        {
          if (filters.Sorter.Field == "name")
          {
            if (filters.Sorter.Order == "asc") results = results.OrderBy(c => c.Name);
            else results = results.OrderByDescending(c => c.Name);
          }
          if (filters.Sorter.Field == "type")
          {
            if (filters.Sorter.Order == "asc") results = results.OrderBy(c => c.Type);
            else results = results.OrderByDescending(c => c.Type);
          }
        }
        var total = results.Count();
        var pages = Math.Ceiling(Convert.ToDouble(total) / filters.Pagination.PageSize);
        var current = filters.Pagination.Current > pages ? pages : filters.Pagination.Current;
        var results2 = results.Skip(filters.Pagination.Current * filters.Pagination.PageSize - filters.Pagination.PageSize).Take(filters.Pagination.PageSize).Select(c => new CategoryWithRelated
        {
          Id = c.Id,
          Name = c.Name,
          Type = c.Type,
        });
        return new PaginationResult<CategoryWithRelated>
        {
          Results = results2.ToList(),
          Total = total,
          Current = Convert.ToInt32(current)
        };
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }
  }
}