namespace MyPocket.Application.DTO
{
  public class AccountDTO
  {
    public string? Id { get; set; }
    public string Name { get; set; }
    public string? UserId { get; set; }
    public UserDTO? User { get; set; }
    public List<TransactionDTO>? Transactions { get; set; }
  }
  public class RemoveRangeModel
  {
    public List<string> Ids { get; set; }
  }

}