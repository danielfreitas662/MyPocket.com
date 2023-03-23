using System.ComponentModel.DataAnnotations.Schema;
namespace MyPocket.Domain.Models
{
  [Table("Categories")]
  public class Category
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string UserId { get; set; }
    public User User { get; set; }
    public ICollection<Budget> Budgets { get; set; }
    public ICollection<Transaction> Transactions { get; set; }
  }

}