using AutoMapper;
using FluentValidation;
using Migue.Domain.Repositories;
using System.Linq.Expressions;

namespace Migue.Domain.AppService.Services;

public abstract class ServiceBase<TEntity, TRequest, TResponse> : IServiceBase<TEntity, TRequest, TResponse> where TEntity : class
{
    protected readonly IRepositoryBase<TEntity> Repository;
    protected readonly IMapper Mapper;
    protected readonly IValidator<TEntity>? Validator;

    protected ServiceBase(IRepositoryBase<TEntity> repository, IMapper mapper, IValidator<TEntity>? validator = null)
    {
        Repository = repository;
        Mapper = mapper;
        Validator = validator;
    }

    /// <summary>Executa antes do CreateAsync/CreateRangeAsync persistir a entidade. Sobrescreva para adicionar regras além do validator injetado (ex: checagens de unicidade que precisam do repository).</summary>
    protected virtual Task ValidateCreateAsync(TEntity entity) => ValidateAsync(entity);

    /// <summary>Executa antes do UpdateAsync persistir a entidade. Sobrescreva para adicionar regras além do validator injetado.</summary>
    protected virtual Task ValidateUpdateAsync(TEntity entity) => ValidateAsync(entity);

    protected virtual async Task ValidateAsync(TEntity entity)
    {
        if (Validator is not null)
            await Validator.ValidateAndThrowAsync(entity);
    }

    public Task<TResponse> CreateAsync(TRequest request, bool isActive = true)
        => CreateAsync(Mapper.Map<TEntity>(request), isActive);

    public Task<TResponse?> UpdateAsync(Guid navigationId, TRequest request)
        => UpdateAsync(navigationId, existing => Mapper.Map(request, existing));

    public async Task<TResponse> CreateAsync(TEntity entity, bool isActive = true)
    {
        await ValidateCreateAsync(entity);
        var created = await Repository.AddAsync(entity, isActive);
        return Mapper.Map<TResponse>(created);
    }

    public async Task<List<TResponse>> CreateRangeAsync(List<TEntity> entities)
    {
        foreach (var entity in entities)
            await ValidateCreateAsync(entity);

        var created = await Repository.AddRangeAsync(entities);
        return Mapper.Map<List<TResponse>>(created);
    }

    public async Task<TResponse> UpdateAsync(TEntity entity)
    {
        await ValidateUpdateAsync(entity);
        var updated = await Repository.UpdateAsync(entity);
        return Mapper.Map<TResponse>(updated);
    }

    public async Task<TResponse?> UpdateAsync(Guid navigationId, Action<TEntity> applyChanges)
    {
        var existing = await Repository.GetByIdAsync(navigationId);
        if (existing is null)
            return default;

        applyChanges(existing);
        return await UpdateAsync(existing);
    }

    public async Task UpdateRangeAsync(List<TEntity> entities)
    {
        foreach (var entity in entities)
            await ValidateUpdateAsync(entity);

        await Repository.UpdateRangeAsync(entities);
    }

    public Task<TEntity1> UpdateDataAsync<TEntity1>(TEntity1 entity,
        params Expression<Func<TEntity1, IEnumerable<object>>>[] collections) where TEntity1 : class
        => Repository.UpdateDataAsync(entity, collections);

    public async Task<TResponse?> GetByIdAsync(Guid id)
    {
        var entity = await Repository.GetByIdAsync(id);
        return entity is null ? default : Mapper.Map<TResponse>(entity);
    }

    public async Task<List<TResponse>> GetAllAsync()
    {
        var entities = await Repository.GetAllAsync();
        return Mapper.Map<List<TResponse>>(entities);
    }

    public async Task<List<TResponse>> GetAllAsync(Expression<Func<TEntity, bool>> predicate)
    {
        var entities = await Repository.GetAllAsync(predicate);
        return Mapper.Map<List<TResponse>>(entities);
    }

    public async Task<DynamicQueryResult<TResponse>> GetPagedAsync(DynamicQuery query)
    {
        var result = await Repository.GetPagedAsync(query);

        return new DynamicQueryResult<TResponse>(result.PageSize)
        {
            PageNumber = result.PageNumber,
            TotalRows = result.TotalRows,
            QueryString = result.QueryString,
            Result = Mapper.Map<List<TResponse>>(result.Result)
        };
    }

    public IQueryable<TEntity> Query() => Repository.Query();

    public Task DeleteAsync(TEntity entity) => Repository.DeleteAsync(entity);

    public async Task<bool> DeleteAsync(Guid navigationId)
    {
        var existing = await Repository.GetByIdAsync(navigationId);
        if (existing is null)
            return false;

        await DeleteAsync(existing);
        return true;
    }

    public Task DeleteRangeAsync(List<TEntity> entities) => Repository.DeleteRangeAsync(entities);

    public Task DeleteRangeAsync(List<Guid> navigationIds) => Repository.DeleteRangeAsync(navigationIds);
}
