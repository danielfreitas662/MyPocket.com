using System.Collections.Generic;
namespace MyPocket.Domain.Models
{
  public class CategoryDTO
  {
    public string Id { get; set; }
    public string Name { get; set; }
    public List<BudgetDTO> Budgets { get; set; }
    public List<TransactionDTO> Transactions { get; set; }
  }

}