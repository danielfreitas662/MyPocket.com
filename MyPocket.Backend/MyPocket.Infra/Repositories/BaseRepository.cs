using System.Linq.Expressions;
using ElevarGestao.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using MyPocket.Domain.Interfaces;

namespace MyPocket.Infra.Repository
{
  public class BaseRepository<T> : IBaseRepository<T> where T : class
  {
    private readonly MyPocketDBContext _context;
    public BaseRepository(MyPocketDBContext context)
    {
      _context = context;
    }
    public T Add(T entity)
    {
      _context.Set<T>().Add(entity);
      return entity;
    }

    public void AddRange(List<T> entities)
    {
      _context.Set<T>().AddRange(entities);
    }

    public List<T> Get(Expression<Func<T, bool>> filter,
           Func<IQueryable<T>, Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<T, object>>? include = null)
    {
      IQueryable<T> result = _context.Set<T>();
      if (include != null)
      {
        result = include(result);
      }
      result = result.Where(filter).AsQueryable();
      return result.ToList();
    }


    public void Remove(T entity)
    {
      _context.Set<T>().Remove(entity);
    }

    public void RemoveRange(List<T> entities)
    {
      _context.Set<T>().RemoveRange(entities);
    }

    public void Update(T entity, T values)
    {
      _context.Entry(entity).CurrentValues.SetValues(values);
    }
    public void SetState(T entity, EntityState state)
    {
      _context.Entry(entity).State = state;
    }

    public async Task<T?> GetSingleAsync(Expression<Func<T, bool>> filter, Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null)
    {
      IQueryable<T> result = _context.Set<T>();
      if (include != null)
      {
        result = include(result);
      }
      return await result.SingleOrDefaultAsync(filter);
    }
  }
}