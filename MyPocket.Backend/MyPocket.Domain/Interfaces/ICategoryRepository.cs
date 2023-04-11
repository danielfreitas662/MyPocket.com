using MyPocket.Domain.Models;
namespace MyPocket.Domain.Interfaces
{
  public interface ICategoryRepository : IBaseRepository<Category>
  {
    PaginationResult<CategoryWithRelated> Filter(PaginationRequest<CategoryWithRelated> filters, string userId);
  }
}