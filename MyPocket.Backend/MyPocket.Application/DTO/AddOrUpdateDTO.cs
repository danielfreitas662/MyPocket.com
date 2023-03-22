namespace MyPocket.Application.DTO
{
  public class AddOrUpdateResult<T>
  {
    public bool New { get; set; }
    public T Entity { get; set; }
  }
}