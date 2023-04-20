using MyPocket.Domain.Models;

namespace MyPocket.Application.DTO
{
  public class CategoryDTO
  {
    public string? Id { get; set; }
    public string Name { get; set; }
    public string? UserId { get; set; }
    public CategoryType Type { get; set; }
    public List<BudgetDTO>? Budgets { get; set; }
    public List<TransactionDTO>? Transactions { get; set; }
  }
  public class CategoryExpenseBudgetDTO
  {
    public string Id { get; set; }
    public string Category { get; set; }
    public decimal Expenses { get; set; }
    public decimal Budget { get; set; }
  }
  public class CategoryExpensesDTO
  {
    public string Id { get; set; }
    public string Category { get; set; }
    public decimal Expenses { get; set; }
  }

}