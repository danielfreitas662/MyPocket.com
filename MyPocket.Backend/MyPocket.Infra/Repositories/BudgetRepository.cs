using ElevarGestao.Infra.Data.Context;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;

namespace MyPocket.Infra.Repositories
{
  public class BudgetRepository : BaseRepository<Budget>, IBudgetRepository
  {
    private readonly MyPocketDBContext _context;
    public BudgetRepository(MyPocketDBContext context) : base(context)
    {
      _context = context;
    }
  }
}