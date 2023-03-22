using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
namespace MyPocket.Domain.Models
{
  [Table("Users")]
  public class User : IdentityUser<Guid>
  {
    public string Name { get; set; }
  }
}