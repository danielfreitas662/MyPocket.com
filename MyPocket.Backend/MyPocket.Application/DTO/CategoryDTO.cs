namespace MyPocket.Application.DTO
{
  public class CategoryDTO
  {
    public Guid? Id { get; set; }
    public string Name { get; set; }
    public string UserId { get; set; }
    public List<BudgetDTO>? Budgets { get; set; }
    public List<TransactionDTO>? Transactions { get; set; }
  }

}