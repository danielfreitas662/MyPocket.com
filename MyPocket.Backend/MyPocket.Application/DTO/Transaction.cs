using System.Collections.Generic;
using System;
namespace MyPocket.Domain.Models
{
  public class TransactionDTO
  {
    public string Id { get; set; }
    public decimal Amount { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public string AccountId { get; set; }
    public AccountDTO Account { get; set; }
    public CategoryDTO Category { get; set; }
    public string CategoryId { get; set; }
    public string UserId { get; set; }
    public UserDTO User { get; set; }
  }
}