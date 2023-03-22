using MyPocket.Application.Interfaces;
using MyPocket.Domain.Interfaces;

namespace MyPocket.Application.Services
{
  public class ApplicationService : IApplicationService
  {
    private readonly IRepositories _repo;
    public IUserService User { get; private set; }
    public IAccountService Account { get; private set; }
    public ICategoryService Category { get; private set; }
    public ITransactionService Transaction { get; private set; }
    public ApplicationService(IRepositories repo)
    {
      _repo = repo;
      User = new UserService(_repo);
      Account = new AccountService(_repo);
      Category = new CategoryService(_repo);
      Transaction = new TransactionService(_repo);
    }

  }
}