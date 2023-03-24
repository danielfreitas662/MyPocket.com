namespace MyPocket.Application.DTO
{
  public class TransactionDTO
  {
    public Guid? Id { get; set; }
    public decimal Amount { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public Guid AccountId { get; set; }
    public string? Account { get; set; }
    public string? Category { get; set; }
    public Guid CategoryId { get; set; }
    public string? UserId { get; set; }
    public UserDTO? User { get; set; }
  }
}