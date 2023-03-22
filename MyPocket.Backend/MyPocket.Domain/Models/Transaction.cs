using System.ComponentModel.DataAnnotations.Schema;
namespace MyPocket.Domain.Models
{
  [Table("Transactions")]
  public class Transaction
  {
    public Guid ID { get; set; }
    public decimal Amount { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public Guid AccountID { get; set; }
    public Account Account { get; set; }
    public Category Category { get; set; }
    public Guid CategoryID { get; set; }
    public Guid UserID { get; set; }
    public User User { get; set; }
  }
}