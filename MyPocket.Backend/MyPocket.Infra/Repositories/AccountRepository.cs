using ElevarGestao.Infra.Data.Context;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;

namespace MyPocket.Infra.Repositories
{
  public class AccountRepository : BaseRepository<Account>, IAccountRepository
  {
    private readonly MyPocketDBContext _context;
    public AccountRepository(MyPocketDBContext context) : base(context)
    {
      _context = context;
    }
  }
}