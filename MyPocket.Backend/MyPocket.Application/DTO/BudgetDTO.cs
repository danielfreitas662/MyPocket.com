using System;
namespace MyPocket.Application.DTO
{
  public class BudgetDTO
  {
    public string? Id { get; set; }
    public decimal Amount { get; set; }
    public string CategoryId { get; set; }
    public string? Category { get; set; }
    public DateTime Month { get; set; }
  }
}