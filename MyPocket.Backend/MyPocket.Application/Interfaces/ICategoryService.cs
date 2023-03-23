using MyPocket.Application.DTO;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Interfaces
{
  public interface ICategoryService
  {
    List<CategoryDTO> GetAll(string UserId);
    PaginationResult<CategoryDTO> Filter(PaginationRequest<CategoryDTO> data, UserData user);
    Task<CategoryDTO> GetByIdAsync(string UserId, string Id);
    Task<AddOrUpdateResult<CategoryDTO>> AddOrUpdateAsync(UserData user, CategoryDTO account);
    Task<CategoryDTO> AddAsync(UserData User, CategoryDTO account);
    Task<CategoryDTO> UpdateAsync(UserData User, CategoryDTO account, CategoryDTO values);
    Task Remove(UserData user, CategoryDTO account);
    Task RemoveRange(UserData user, List<Guid> ids);
  }
}