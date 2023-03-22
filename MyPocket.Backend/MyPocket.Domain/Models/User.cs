using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
namespace MyPocket.Domain.Models
{
  [Table("Users")]
  public class User : IdentityUser
  {
    public Guid Name { get; set; }
    public ICollection<Transaction> Transactions { get; set; }
  }
}