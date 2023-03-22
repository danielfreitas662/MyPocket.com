using MyPocket.Application.Interfaces;
using MyPocket.Domain.Interfaces;

namespace MyPocket.Application.Services
{
  public class CategoryService : ICategoryService
  {
    private readonly IRepositories _repo;
    public CategoryService(IRepositories repo)
    {
      _repo = repo;
    }

  }
}