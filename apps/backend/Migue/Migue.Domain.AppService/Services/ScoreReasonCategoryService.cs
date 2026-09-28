using AutoMapper;
using FluentValidation;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.AppService.Services;

public class ScoreReasonCategoryService
    : ServiceBase<ScoreReasonCategory, ScoreReasonCategoryRequest, ScoreReasonCategoryResponse>, IScoreReasonCategoryService
{
    private readonly IScoreReasonCategoryRepository _categoryRepository;

    public ScoreReasonCategoryService(IScoreReasonCategoryRepository repository, IMapper mapper,
        IValidator<ScoreReasonCategory> validator)
        : base(repository, mapper, validator)
    {
        _categoryRepository = repository;
    }

    public async Task<List<ScoreReasonCategoryResponse>> GetActiveAsync()
    {
        var categories = await _categoryRepository.GetActiveAsync();
        return Mapper.Map<List<ScoreReasonCategoryResponse>>(categories);
    }

    public Task<bool> HasScoreReasonsAsync(Guid navigationId) => _categoryRepository.HasScoreReasonsAsync(navigationId);
}
