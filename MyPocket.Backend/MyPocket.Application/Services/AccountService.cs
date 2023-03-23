using MyPocket.Application.DTO;
using MyPocket.Application.Interfaces;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Application.Services
{
  public class AccountService : IAccountService
  {
    private readonly IRepositories _repo;
    public AccountService(IRepositories repo)
    {
      _repo = repo;
    }

    public async Task<AccountDTO> AddAsync(UserData User, AccountDTO account)
    {
      try
      {
        var newAccount = _repo.Account.Add(new Account
        {
          Name = account.Name,
          UserId = User.UserId
        });
        await _repo.SaveAsync();
        return new AccountDTO
        {
          Name = newAccount.Name,
          Id = newAccount.Id,
        };
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public PaginationResult<AccountDTO> Filter(PaginationRequest<AccountDTO> data, UserData user)
    {
      throw new NotImplementedException();
    }

    public List<AccountDTO> GetAll(string UserId)
    {
      try
      {
        var result = _repo.Account.Get(c => c.UserId == UserId).Select(c => new AccountDTO
        {
          Name = c.Name,
          Id = c.Id
        });
        return result.ToList();
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task<AccountDTO?> GetByIdAsync(string UserId, Guid Id)
    {
      try
      {
        var result = await _repo.Account.GetSingleAsync(c => c.Id == Id && c.UserId == UserId);
        if (result == null) return null;
        return new AccountDTO
        {
          Name = result.Name,
          Id = result.Id
        };
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task RemoveAsync(UserData user, AccountDTO account)
    {
      try
      {
        var entity = await _repo.Account.GetSingleAsync(c => c.Id == account.Id && c.UserId == user.UserId);
        if (entity == null) throw new NullReferenceException("Invalid account");
        _repo.Account.Remove(entity);
        await _repo.SaveAsync();
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task RemoveRangeAsync(UserData user, List<Guid> ids)
    {
      try
      {
        var accounts = _repo.Account.Get(c => c.UserId == user.UserId && ids.Contains(c.Id));
        _repo.Account.RemoveRange(accounts);
        await _repo.SaveAsync();
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message, ex);
      }
    }

    public async Task<AccountDTO> UpdateAsync(UserData User, AccountDTO account, AccountDTO values)
    {
      try
      {
        account.UserId = User.UserId;
        values.UserId = User.UserId;
        var entity = await _repo.Account.GetSingleAsync(c => c.Id == account.Id);
        _repo.Account.Update(entity, values);
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