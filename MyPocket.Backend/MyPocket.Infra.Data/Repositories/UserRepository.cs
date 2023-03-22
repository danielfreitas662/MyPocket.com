using MyPocket.Infra.Data.Context;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;

namespace MyPocket.Infra.Repository
{
  public class UserRepository : BaseRepository<User>, IUserRepository
  {
    private readonly MyPocketDBContext _context;
    public UserRepository(MyPocketDBContext context) : base(context)
    {
      _context = context;
    }
  }
}