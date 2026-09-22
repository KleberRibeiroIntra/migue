using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Migue.Domain.Data.Extensions;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.Data.Repositories;

public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : BaseEntity
{
    protected readonly MigueDbContext Context;
    protected readonly DbSet<T> DbSet;

    protected RepositoryBase(MigueDbContext context)
    {
        Context = context;
        DbSet = context.Set<T>();
    }

    public async Task<T> AddAsync(T entity, bool isActive = true)
    {
        entity.NavigationId = entity.NavigationId == Guid.Empty ? Guid.NewGuid() : entity.NavigationId;
        entity.CreatedAt = DateTime.UtcNow;
        entity.Active = isActive;

        await DbSet.AddAsync(entity);
        await Context.SaveChangesAsync();
        return entity;
    }

    public async Task<List<T>> AddRangeAsync(List<T> entities)
    {
        foreach (var entity in entities)
        {
            entity.NavigationId = entity.NavigationId == Guid.Empty ? Guid.NewGuid() : entity.NavigationId;
            entity.CreatedAt = DateTime.UtcNow;
        }

        await DbSet.AddRangeAsync(entities);
        await Context.SaveChangesAsync();
        return entities;
    }

    public async Task<T> UpdateAsync(T entity)
    {
        entity.UpdatedAt = DateTime.UtcNow;
        DbSet.Update(entity);
        await Context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateRangeAsync(List<T> entities)
    {
        foreach (var entity in entities)
            entity.UpdatedAt = DateTime.UtcNow;

        DbSet.UpdateRange(entities);
        await Context.SaveChangesAsync();
    }

    public async Task<TEntity> UpdateDataAsync<TEntity>(TEntity entity,
        params Expression<Func<TEntity, IEnumerable<object>>>[] collections) where TEntity : class
    {
        var entry = Context.Entry(entity);
        entry.State = EntityState.Modified;

        foreach (var collection in collections)
            entry.Collection(collection).IsModified = true;

        await Context.SaveChangesAsync();
        return entity;
    }

    public virtual Task<T?> GetByIdAsync(Guid id) =>
        DbSet.FirstOrDefaultAsync(e => e.NavigationId == id && e.Active);

    public Task<List<T>> GetAllAsync() =>
        DbSet.Where(e => e.Active).ToListAsync();

    public Task<List<T>> GetAllAsync(Expression<Func<T, bool>> predicate) =>
        DbSet.Where(e => e.Active).Where(predicate).ToListAsync();

    public virtual Task<DynamicQueryResult<T>> GetPagedAsync(DynamicQuery query) =>
        DbSet.Where(e => e.Active).ToPagedAsync(query);

    public IQueryable<T> Query() => DbSet.Where(e => e.Active);

    public async Task DeleteAsync(T entity)
    {
        DbSet.Remove(entity);
        await Context.SaveChangesAsync();
    }

    public async Task DeleteRangeAsync(List<T> entities)
    {
        DbSet.RemoveRange(entities);
        await Context.SaveChangesAsync();
    }

    public async Task DeleteRangeAsync(List<Guid> navigationIds)
    {
        var entities = await DbSet.Where(e => navigationIds.Contains(e.NavigationId)).ToListAsync();
        DbSet.RemoveRange(entities);
        await Context.SaveChangesAsync();
    }
}
