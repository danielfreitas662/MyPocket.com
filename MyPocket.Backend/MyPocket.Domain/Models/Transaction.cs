using System.ComponentModel.DataAnnotations.Schema;
namespace MyPocket.Domain.Models
{
  [Table("Transactions")]
  public class Transaction
  {
    public string Id { get; set; }
    public decimal Amount { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public string AccountId { get; set; }
    public Account Account { get; set; }
    public Category Category { get; set; }
    public string CategoryId { get; set; }
    public string UserId { get; set; }
    public User User { get; set; }
  }
  public class TransactionWithRelated
  {
    public string? Id { get; set; }
    public decimal? Amount { get; set; }
    public string? Description { get; set; }
    public DateTime? Date { get; set; }
    public string? Account { get; set; }
    public string? Category { get; set; }
  }
  public class AmountByCategoryModel
  {
    public string Category { get; set; }
    public decimal Amount { get; set; }
  }
  public class MonthTransaction
  {
    public DateTime Date { get; set; }
    public decimal Amount { get; set; }
  }
  public class ResultByMonth
  {
    public DateTime Date { get; set; }
    public decimal Income { get; set; }
    public decimal Expense { get; set; }
    public decimal Result { get; set; }
  }
}