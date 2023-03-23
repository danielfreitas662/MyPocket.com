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

    public Task<BudgetDTO> AddAsync(UserData User, BudgetDTO account)
    {
      throw new NotImplementedException();
    }

    public Task<AddOrUpdateResult<BudgetDTO>> AddOrUpdateAsync(UserData user, BudgetDTO account)
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

    public Task<BudgetDTO> GetByIdAsync(string UserId, string Id)
    {
      throw new NotImplementedException();
    }

    public Task Remove(UserData user, BudgetDTO account)
    {
      throw new NotImplementedException();
    }

    public Task RemoveRange(UserData user, List<Guid> ids)
    {
      throw new NotImplementedException();
    }

    public Task<BudgetDTO> UpdateAsync(UserData User, BudgetDTO account, BudgetDTO values)
    {
      throw new NotImplementedException();
    }
  }
}