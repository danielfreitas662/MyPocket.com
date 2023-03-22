using System.ComponentModel.DataAnnotations.Schema;
namespace MyPocket.Domain.Models
{
  [Table("Categories")]
  public class Category
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public ICollection<Budget> Budgets { get; set; }
    public ICollection<Transaction> Transactions { get; set; }
  }

}