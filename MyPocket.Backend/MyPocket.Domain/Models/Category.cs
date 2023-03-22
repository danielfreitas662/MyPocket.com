using System.ComponentModel.DataAnnotations.Schema;
namespace MyPocket.Domain.Models
{
  [Table("Categories")]
  public class Category
  {
    public Guid ID { get; set; }
    public string Name { get; set; }
  }

}