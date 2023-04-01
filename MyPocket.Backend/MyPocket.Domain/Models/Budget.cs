using System.ComponentModel.DataAnnotations.Schema;
namespace MyPocket.Domain.Models
{
  [Table("Budgets")]
  public class Budget
  {
    public string Id { get; set; }
    public decimal Amount { get; set; }
    public string CategoryId { get; set; }
    public Category Category { get; set; }
    public DateTime Month { get; set; }
  }
}