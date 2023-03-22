using MyPocket.Application.DTO;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Interfaces
{
  public interface ICategoryService
  {
    List<CategoryDTO> GetAll(string UserId);
    PaginationResult<CategoryDTO> Filter(PaginationRequest<CategoryDTO> data, UserData user);
    Task<CategoryDTO> GetByIdAsync(string UserId, string Id);
    CategoryDTO AddOrUpdate(UserData user);
    Task Remove(CategoryDTO account);
    Task RemoveRange(List<CategoryDTO> accounts);
  }
}