using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
namespace MyPocket.Domain.Models
{
  [Table("Users")]
  public class User : IdentityUser
  {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public ICollection<Transaction> Transactions { get; set; }
    public ICollection<Category> Categories { get; set; }
    public ICollection<Account> Accounts { get; set; }
  }
}