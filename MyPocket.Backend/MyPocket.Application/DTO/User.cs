using System.Collections.Generic;
namespace MyPocket.Domain.Models
{
  public class UserDTO
  {
    public string Name { get; set; }
    public List<TransactionDTO> Transactions { get; set; }
  }
}