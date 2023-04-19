using System;
namespace MyPocket.Application.DTO
{
  public class BudgetDTO
  {
    public string? Id { get; set; }
    public DateTime Month { get; set; }
    public decimal? Amount { get; set; }
    public List<BudgetItemDTO>? Items { get; set; }
  }
  public class BudgetItemDTO
  {
    public string? Id { get; set; }
    public string? BudgetId { get; set; }
    public DateTime Month { get; set; }
    public string Category { get; set; }
    public string CategoryId { get; set; }
    public decimal Amount { get; set; }
  }
}