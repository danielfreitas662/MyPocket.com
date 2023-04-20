using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace MyPocket.Domain.Interfaces
{
  public interface IBaseRepository<T> where T : class
  {
    List<T> Get(Expression<Func<T, bool>> filter, Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null);
    Task<T?> GetSingleAsync(Expression<Func<T, bool>> filter, Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null);
    T Add(T entity);
    void AddRange(List<T> entities);
    void Remove(T entity);
    void RemoveRange(List<T> entities);
    void Update(T entity, object values);
    void SetState(T entity, EntityState state);
  }
}