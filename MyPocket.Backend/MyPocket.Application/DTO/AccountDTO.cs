namespace MyPocket.Application.DTO
{
  public class AccountDTO
  {
    public Guid? Id { get; set; }
    public string Name { get; set; }
    public string? UserId { get; set; }
    public UserDTO? User { get; set; }
    public List<TransactionDTO>? Transactions { get; set; }
  }
  public class RemoveRangeModel
  {
    public List<Guid> Ids { get; set; }
  }

}