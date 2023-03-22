namespace MyPocket.Application.DTO
{
  public class UserDTO
  {
    public string Name { get; set; }
    public List<TransactionDTO> Transactions { get; set; }
  }
}