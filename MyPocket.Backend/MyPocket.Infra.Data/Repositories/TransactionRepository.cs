using ElevarGestao.Infra.Data.Context;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;

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
  }
}