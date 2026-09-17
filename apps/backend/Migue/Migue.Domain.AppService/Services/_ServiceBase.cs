using System.Linq.Expressions;
using Migue.Domain.Repositories;
using Migue.Domain.Services;

namespace Migue.Domain.AppService.Services;

public abstract class ServiceBase<T> : IServiceBase<T> where T : class
{
    protected readonly IRepositoryBase<T> Repository;

    protected ServiceBase(IRepositoryBase<T> repository)
    {
        Repository = repository;
    }

    public Task<T> CreateAsync(T entity, bool isActive = true) => Repository.AddAsync(entity, isActive);

    public Task<List<T>> CreateRangeAsync(List<T> entities) => Repository.AddRangeAsync(entities);

    public Task<T> UpdateAsync(T entity) => Repository.UpdateAsync(entity);

    public Task UpdateRangeAsync(List<T> entities) => Repository.UpdateRangeAsync(entities);

    public Task<TEntity> UpdateDataAsync<TEntity>(TEntity entity,
        params Expression<Func<TEntity, IEnumerable<object>>>[] collections) where TEntity : class
        => Repository.UpdateDataAsync(entity, collections);

    public Task<T?> GetByIdAsync(Guid id) => Repository.GetByIdAsync(id);

    public Task<List<T>> GetAllAsync() => Repository.GetAllAsync();

    public Task<List<T>> GetAllAsync(Expression<Func<T, bool>> predicate) => Repository.GetAllAsync(predicate);

    public Task<DynamicQueryResult<T>> GetPagedAsync(DynamicQuery query) => Repository.GetPagedAsync(query);

    public IQueryable<T> Query() => Repository.Query();

    public Task DeleteAsync(T entity) => Repository.DeleteAsync(entity);

    public Task DeleteRangeAsync(List<T> entities) => Repository.DeleteRangeAsync(entities);

    public Task DeleteRangeAsync(List<Guid> navigationIds) => Repository.DeleteRangeAsync(navigationIds);
}
