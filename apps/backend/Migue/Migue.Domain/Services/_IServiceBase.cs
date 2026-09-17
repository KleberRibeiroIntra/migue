using System.Linq.Expressions;

namespace Migue.Domain.Services;

public interface IServiceBase<T> where T : class
{
    Task<T> CreateAsync(T entity, bool isActive = true);
    Task<List<T>> CreateRangeAsync(List<T> entities);
    Task<T> UpdateAsync(T entity);
    Task UpdateRangeAsync(List<T> entities);
    Task<TEntity> UpdateDataAsync<TEntity>(TEntity entity,
        params Expression<Func<TEntity, IEnumerable<object>>>[] collections) where TEntity : class;
    Task<T?> GetByIdAsync(Guid id);
    Task<List<T>> GetAllAsync();
    Task<List<T>> GetAllAsync(Expression<Func<T, bool>> predicate);
    Task<DynamicQueryResult<T>> GetPagedAsync(DynamicQuery query);
    IQueryable<T> Query();
    Task DeleteAsync(T entity);
    Task DeleteRangeAsync(List<T> entities);
    Task DeleteRangeAsync(List<Guid> navigationIds);
}
