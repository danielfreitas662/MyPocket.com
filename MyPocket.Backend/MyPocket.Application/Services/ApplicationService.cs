using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MyPocket.Application.Interfaces;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;

namespace MyPocket.Application.Services
{
  public class ApplicationService : IApplicationService
  {
    private readonly IRepositories _repo;
    private readonly SignInManager<User> _singInManager;
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _config;
    public IUserService User { get; private set; }
    public IAccountService Account { get; private set; }
    public ICategoryService Category { get; private set; }
    public ITransactionService Transaction { get; private set; }
    public IBudgetService Budget { get; private set; }
    public ApplicationService(IRepositories repo, SignInManager<User> signinManager, IConfiguration config, UserManager<User> userManager)
    {
      _repo = repo;
      _singInManager = signinManager;
      _config = config;
      _userManager = userManager;
      User = new UserService(_repo, _singInManager, _config, _userManager);
      Account = new AccountService(_repo);
      Category = new CategoryService(_repo);
      Transaction = new TransactionService(_repo);
      Budget = new BugetService(_repo);
    }
  }
}