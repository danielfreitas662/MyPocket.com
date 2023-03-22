using System.Collections.Generic;
namespace MyPocket.Domain.Models
{
  public class AccountDTO
  {
    public string Id { get; set; }
    public string Name { get; set; }
    public List<TransactionDTO> Transactions { get; set; }
  }

}