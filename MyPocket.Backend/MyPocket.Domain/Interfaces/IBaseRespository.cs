using System.Collections.Generic;
namespace MyPocket.Domain.Interfaces
{
  public interface IBaseRepository<T> where T : class
  {
    List<T> GetAll(Guid userID);
    T GetByID(Guid userID, int ID);
    T Add(T entity);
    List<T> AddRange(List<T> entities);
    void Remove(T entity);
    void RemoveRange(List<T> entities);
    T Update(T entity, T values);
  }
}