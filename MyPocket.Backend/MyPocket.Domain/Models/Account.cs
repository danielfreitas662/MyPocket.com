using System.ComponentModel.DataAnnotations.Schema;
namespace MyPocket.Domain.Models
{
  [Table("Accounts")]
  public class Account
  {
    public string Id { get; set; }
    public string Name { get; set; }
    public string UserId { get; set; }
    public User User { get; set; }
    public ICollection<Transaction> Transactions { get; set; }
  }
  public class AccountWithRelated
  {
    public string? Id { get; set; }
    public string? Name { get; set; }
  }

}