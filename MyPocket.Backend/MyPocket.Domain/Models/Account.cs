using System.ComponentModel.DataAnnotations.Schema;
namespace MyPocket.Domain.Models
{
  [Table("Accounts")]
  public class Account
  {
    public Guid ID { get; set; }
    public string Name { get; set; }
  }

}