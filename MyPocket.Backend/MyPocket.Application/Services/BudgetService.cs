using MyPocket.Application.DTO;
using MyPocket.Application.Interfaces;
using MyPocket.Domain.Interfaces;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Services
{
  public class BugetService : IBudgetService
  {
    private readonly IRepositories _repo;
    public BugetService(IRepositories repo)
    {
      _repo = repo;
    }

    public BudgetDTO AddOrUpdate(UserData user)
    {
      throw new NotImplementedException();
    }

    public PaginationResult<BudgetDTO> Filter(PaginationRequest<BudgetDTO> data, UserData user)
    {
      throw new NotImplementedException();
    }

    public List<BudgetDTO> GetAll(string UserId)
    {
      throw new NotImplementedException();
    }

    public Task<AccountDTO> GetByIdAsync(string UserId, string Id)
    {
      throw new NotImplementedException();
    }

    public Task Remove(BudgetDTO account)
    {
      throw new NotImplementedException();
    }

    public Task RemoveRange(List<BudgetDTO> accounts)
    {
      throw new NotImplementedException();
    }
  }
}