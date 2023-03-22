using MyPocket.Application.Interfaces;
using MyPocket.Domain.Interfaces;

namespace MyPocket.Application.Services
{
  public class TransactionService : ITransactionService
  {
    private readonly IRepositories _repo;
    public TransactionService(IRepositories repo)
    {
      _repo = repo;
    }

  }
}