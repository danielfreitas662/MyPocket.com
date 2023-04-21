using System.ComponentModel.DataAnnotations.Schema;
namespace MyPocket.Domain.Models
{
  [Table("Budgets")]
  public class Budget
  {
    public string Id { get; set; }
    public DateTime Month { get; set; }
    public string UserId { get; set; }
    public User User { get; set; }
    public ICollection<BudgetItem> Items { get; set; }
  }
  [Table("BudgetItems")]
  public class BudgetItem
  {
    public string Id { get; set; }
    public decimal Amount { get; set; }
    public string CategoryId { get; set; }
    public Category Category { get; set; }
    public string BudgetId { get; set; }
    public Budget Budget { get; set; }

  }
  public class BudgetWithRelated
  {
    public string? Id { get; set; }
    public DateTime? Month { get; set; }
    public decimal? Amount { get; set; }
    public decimal? Actual { get; set; }
  }
}