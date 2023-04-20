using System.ComponentModel.DataAnnotations.Schema;
namespace MyPocket.Domain.Models
{
  public enum CategoryType
  {
    Income = 0,
    Expense = 1
  }
  [Table("Categories")]
  public class Category
  {
    public string Id { get; set; }
    public string Name { get; set; }
    public string UserId { get; set; }
    public CategoryType Type { get; set; }
    public User User { get; set; }
    public ICollection<BudgetItem> BudgetItems { get; set; }
    public ICollection<Transaction> Transactions { get; set; }
  }
  public class CategoryWithRelated
  {
    public string? Id { get; set; }
    public string? Name { get; set; }
    public CategoryType? Type { get; set; }
  }
}