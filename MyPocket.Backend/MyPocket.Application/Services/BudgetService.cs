using MyPocket.Application.Interfaces;
using MyPocket.Domain.Interfaces;

namespace MyPocket.Application.Services
{
  public class BugetService : IBudgetService
  {
    private readonly IRepositories _repo;
    public BugetService(IRepositories repo)
    {
      _repo = repo;
    }

  }
}