using System.ComponentModel.DataAnnotations.Schema;
namespace MyPocket.Domain.Models
{
  [Table("Transactions")]
  public class Transaction
  {
    public Guid Id { get; set; }
    public decimal Amount { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public Guid AccountId { get; set; }
    public Account Account { get; set; }
    public Category Category { get; set; }
    public Guid CategoryId { get; set; }
    public string UserId { get; set; }
    public User User { get; set; }
  }
}