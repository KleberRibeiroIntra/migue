using AutoMapper;
using FluentValidation;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;
using Migue.Domain.Enums;
using Migue.Domain.Repositories;

namespace Migue.Domain.AppService.Services;

public class ScoreReasonService : ServiceBase<ScoreReason, ScoreReasonRequest, ScoreReasonResponse>, IScoreReasonService
{
    private readonly IScoreReasonRepository _scoreReasonRepository;

    public ScoreReasonService(IScoreReasonRepository repository, IMapper mapper, IValidator<ScoreReason> validator)
        : base(repository, mapper, validator)
    {
        _scoreReasonRepository = repository;
    }

    public async Task<List<ScoreReasonResponse>> GetBySentimentAsync(ScoreReasonSentiment? sentiment)
    {
        var reasons = await _scoreReasonRepository.GetBySentimentAsync(sentiment);
        return Mapper.Map<List<ScoreReasonResponse>>(reasons);
    }
}
