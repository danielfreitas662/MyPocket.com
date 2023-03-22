namespace MyPocket.Application.DTO
{
  public class PaginationRequest<T>
  {
    public Filters<T> Filters { get; set; }
    public Pagination Pagination { get; set; }
    public Sorter Sorter { get; set; }
  }
  public class Pagination
  {
    public int Current { get; set; }
    public int PageSize { get; set; }
  }
  public class Sorter
  {
    public string Field { get; set; }
    public string Order { get; set; }
  }
  public class Filters<T>
  {
    public Dictionary<string, object> data { get; set; }
  }
  public class PaginationResult<T>
  {
    public List<T> Results { get; set; }
    public int Total { get; set; }
    public int Current { get; set; }
  }

}