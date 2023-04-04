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

  }
}