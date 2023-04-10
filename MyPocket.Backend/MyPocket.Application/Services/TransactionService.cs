using Microsoft.EntityFrameworkCore;
using MyPocket.Application.DTO;
using MyPocket.Application.Interfaces;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Services
{
  public class TransactionService : ITransactionService
  {
    private readonly IRepositories _repo;
    public TransactionService(IRepositories repo)
    {
      _repo = repo;
    }
    public async Task<TransactionDTO> AddAsync(UserData user, TransactionDTO transaction)
    {
      try
      {
        var category = await _repo.Category.GetSingleAsync(c => c.Id == transaction.CategoryId);
        if (category == null) throw new NullReferenceException("Invalid category");
        var account = await _repo.Account.GetSingleAsync(c => c.Id == transaction.AccountId);
        if (account == null) throw new NullReferenceException("Invalid account");
        var newtransaction = _repo.Transaction.Add(new Transaction
        {
          Id = Guid.NewGuid().ToString(),
          Amount = transaction.Amount,
          CategoryId = transaction.CategoryId,
          Description = transaction.Description,
          Date = transaction.Date,
          AccountId = transaction.AccountId,
          UserId = user.UserId,
        });
        await _repo.SaveAsync();
        return new TransactionDTO
        {
          Amount = newtransaction.Amount,
          Description = newtransaction.Description,
          Category = category.Name,
          Account = account.Name,
          CategoryId = newtransaction.CategoryId,
          Id = newtransaction.Id,
          Date = newtransaction.Date
        };
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public PaginationResult<TransactionWithRelated> Filter(PaginationRequest<TransactionWithRelated> data, UserData user)
    {
      try
      {
        var result = _repo.Transaction.Filter(data, user.UserId);
        return result;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public List<TransactionDTO> GetAll(string UserId)
    {
      try
      {
        var result = _repo.Transaction.Get(c => c.UserId == UserId, include: c => c.Include(d => d.Category).Include(d => d.Account)).Select(c => new TransactionDTO
        {
          Amount = c.Amount,
          Description = c.Description,
          Date = c.Date,
          CategoryId = c.CategoryId,
          Category = c.Category.Name,
          Account = c.Account.Name,
          AccountId = c.AccountId,
          Id = c.Id
        });
        return result.ToList();
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task<TransactionDTO?> GetByIdAsync(string UserId, string Id)
    {
      try
      {
        var result = await _repo.Transaction.GetSingleAsync(c => c.Id == Id && c.UserId == UserId, include: c => c.Include(d => d.Category).Include(d => d.Account));
        if (result == null) return null;
        return new TransactionDTO
        {
          Amount = result.Amount,
          Date = result.Date,
          Account = result.Account.Name,
          Category = result.Category.Name,
          AccountId = result.AccountId,
          CategoryId = result.CategoryId,
          Description = result.Description,
          Id = result.Id
        };
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task RemoveAsync(UserData user, TransactionDTO transaction)
    {
      try
      {
        var entity = await _repo.Transaction.GetSingleAsync(c => c.Id == transaction.Id && c.UserId == user.UserId);
        if (entity == null) throw new NullReferenceException("Invalid transaction");
        _repo.Transaction.Remove(entity);
        await _repo.SaveAsync();
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task RemoveRangeAsync(UserData user, List<string> ids)
    {
      try
      {
        var transactions = _repo.Transaction.Get(c => c.UserId == user.UserId && ids.Contains(c.Id));
        _repo.Transaction.RemoveRange(transactions);
        await _repo.SaveAsync();
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task<TransactionDTO> UpdateAsync(UserData User, TransactionDTO transaction, TransactionDTO values)
    {
      try
      {
        var entity = await _repo.Transaction.GetSingleAsync(c => c.Id == transaction.Id);
        values.UserId = User.UserId;
        _repo.Transaction.Update(entity, values);
        await _repo.SaveAsync();
        return values;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }
  }
}