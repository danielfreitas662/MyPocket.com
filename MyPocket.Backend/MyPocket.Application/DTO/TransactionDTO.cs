namespace MyPocket.Application.DTO
{
  public class TransactionDTO
  {
    public string? Id { get; set; }
    public decimal Amount { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public string AccountId { get; set; }
    public string? Account { get; set; }
    public string? Category { get; set; }
    public string CategoryId { get; set; }
    public string? UserId { get; set; }
    public UserDTO? User { get; set; }
  }
}