using System;
namespace MyPocket.Domain.Models
{
  public class BudgetDTO
  {
    public string Id { get; set; }
    public decimal Amount { get; set; }
    public string CategoryId { get; set; }
    public CategoryDTO Category { get; set; }
    public DateTime Month { get; set; }
  }
}