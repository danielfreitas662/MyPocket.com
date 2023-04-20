using MyPocket.Infra.Data.Context;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;

namespace MyPocket.Infra.Repository
{
  public class BudgetItemRepository : BaseRepository<BudgetItem>, IBudgetItemRepository
  {
    private readonly MyPocketDBContext _context;
    public BudgetItemRepository(MyPocketDBContext context) : base(context)
    {
      _context = context;
    }
  }
}