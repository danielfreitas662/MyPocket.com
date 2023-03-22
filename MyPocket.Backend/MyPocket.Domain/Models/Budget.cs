using System.ComponentModel.DataAnnotations.Schema;
namespace MyPocket.Domain.Models
{
  [Table("Budgets")]
  public class Budget
  {
    public Guid ID { get; set; }
    public decimal Amount { get; set; }
    public Guid CategoryID { get; set; }
    public Category Category { get; set; }
    public DateTime Month { get; set; }
  }
}