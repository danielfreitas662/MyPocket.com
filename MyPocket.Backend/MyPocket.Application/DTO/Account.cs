using System.Collections.Generic;
namespace MyPocket.Application.DTO
{
  public class AccountDTO
  {
    public string Id { get; set; }
    public string Name { get; set; }
    public List<TransactionDTO> Transactions { get; set; }
  }
  public class RemoveRangeModel
  {
    public List<string> Ids { get; set; }
  }

}