using MyPocket.Infra.Data.Context;
using Microsoft.EntityFrameworkCore.Storage;
using MyPocket.Domain.Interfaces;

namespace MyPocket.Infra.Repository
{
  public class Repositories : IRepositories
  {
    protected readonly MyPocketDBContext _context;
    private IDbContextTransaction? _transaction;
    public IBudgetRepository Budget { get; private set; }

    public ICategoryRepository Category { get; private set; }

    public ITransactionRepository Transaction { get; private set; }

    public IAccountRepository Account { get; private set; }
    public IUserRepository User { get; private set; }
    public Repositories(MyPocketDBContext context)
    {
      _context = context;
      Budget = new BudgetRepository(_context);
      Account = new AccountRepository(_context);
      Transaction = new TransactionRepository(_context);
      Category = new CategoryRepository(_context);
      User = new UserRepository(_context);
    }

    public async Task<int> SaveAsync()
    {
      try
      {
        var result = await _context.SaveChangesAsync();
        return result;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public void BeginTransaction()
    {
      _transaction = _context.Database.BeginTransaction();
    }

    public async Task CompleteAsync()
    {
      if (_transaction != null)
      {
        try
        {
          await _transaction.CommitAsync();
          await _transaction.DisposeAsync();
          _transaction = null;
        }
        catch (Exception ex)
        {
          if (_transaction != null)
            _transaction.Rollback();
          throw new Exception(ex.Message, ex);
        }
      }
    }
  }
}