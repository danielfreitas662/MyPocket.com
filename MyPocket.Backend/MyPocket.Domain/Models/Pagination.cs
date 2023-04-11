
namespace MyPocket.Domain.Models
{
  public class PaginationRequest<T>
  {
    public T Filters { get; set; }
    public Pagination Pagination { get; set; }
    public Sorter Sorter { get; set; }
  }
  public class Pagination
  {
    public int Current { get; set; } = 1;
    public int PageSize { get; set; } = 10;
  }
  public class Sorter
  {
    public string? Field { get; set; }
    public string? Order { get; set; }
  }
  public class PaginationResult<T>
  {
    public List<T> Results { get; set; }
    public int Total { get; set; }
    public int Current { get; set; }
  }
}