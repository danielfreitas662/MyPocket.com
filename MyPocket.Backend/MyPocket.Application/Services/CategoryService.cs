using MyPocket.Application.DTO;
using MyPocket.Application.Interfaces;
using MyPocket.Domain.Interfaces;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Services
{
  public class CategoryService : ICategoryService
  {
    private readonly IRepositories _repo;
    public CategoryService(IRepositories repo)
    {
      _repo = repo;
    }

    public Task<CategoryDTO> AddAsync(UserData User, CategoryDTO account)
    {
      throw new NotImplementedException();
    }

    public Task<AddOrUpdateResult<CategoryDTO>> AddOrUpdateAsync(UserData user, CategoryDTO account)
    {
      throw new NotImplementedException();
    }

    public PaginationResult<CategoryDTO> Filter(PaginationRequest<CategoryDTO> data, UserData user)
    {
      throw new NotImplementedException();
    }

    public List<CategoryDTO> GetAll(string UserId)
    {
      throw new NotImplementedException();
    }

    public Task<CategoryDTO> GetByIdAsync(string UserId, string Id)
    {
      throw new NotImplementedException();
    }

    public Task Remove(UserData user, CategoryDTO account)
    {
      throw new NotImplementedException();
    }

    public Task RemoveRange(UserData user, List<Guid> ids)
    {
      throw new NotImplementedException();
    }

    public Task<CategoryDTO> UpdateAsync(UserData User, CategoryDTO account, CategoryDTO values)
    {
      throw new NotImplementedException();
    }
  }
}