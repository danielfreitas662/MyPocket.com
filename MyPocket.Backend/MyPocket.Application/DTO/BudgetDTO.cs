using System;
namespace MyPocket.Application.DTO
{
  public class BudgetDTO
  {
    public Guid? Id { get; set; }
    public decimal Amount { get; set; }
    public Guid CategoryId { get; set; }
    public CategoryDTO? Category { get; set; }
    public DateTime Month { get; set; }
  }
}