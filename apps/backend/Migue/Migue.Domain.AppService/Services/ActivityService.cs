using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;
using Migue.Domain.Enums;
using Migue.Domain.Repositories;

namespace Migue.Domain.AppService.Services;

public class ActivityService : ServiceBase<Activity, ActivityRequest, ActivityResponse>, IActivityService
{
    /// <summary>A partir desta nota as justificativas são positivas; abaixo dela, negativas.</summary>
    private const int PositiveScoreThreshold = 4;

    private readonly IScoreReasonRepository _scoreReasonRepository;

    public ActivityService(IActivityRepository repository, IScoreReasonRepository scoreReasonRepository, IMapper mapper,
        IValidator<Activity> validator)
        : base(repository, mapper, validator)
    {
        _scoreReasonRepository = scoreReasonRepository;
    }

    public async Task<ActivityResponse?> ScoreAsync(Guid activityId, Guid userId, ScoreActivityRequest request)
    {
        var activity = await Repository.GetByIdAsync(activityId);
        if (activity is null || activity.UserId != userId)
            return null;

        var reasons = await _scoreReasonRepository.GetAllAsync(r => request.ScoreReasonIds.Contains(r.NavigationId));
        var failures = Validate(request, reasons);
        if (failures.Count > 0)
            throw new ValidationException(failures);

        activity.SelfScore = request.SelfScore;
        activity.SelfScoreComment = string.IsNullOrWhiteSpace(request.SelfScoreComment) ? null : request.SelfScoreComment.Trim();
        activity.UpdatedBy = userId;

        // Sincroniza as justificativas: as que saíram da coleção são apagadas (cascade), as que ficaram são mantidas.
        var selectedIds = reasons.Select(r => r.NavigationId).ToHashSet();
        foreach (var removed in activity.ScoreReasons.Where(r => !selectedIds.Contains(r.ScoreReasonId)).ToList())
            activity.ScoreReasons.Remove(removed);

        var currentIds = activity.ScoreReasons.Select(r => r.ScoreReasonId).ToHashSet();
        var now = DateTime.UtcNow;
        foreach (var reason in reasons.Where(r => !currentIds.Contains(r.NavigationId)))
        {
            activity.ScoreReasons.Add(new ActivityScoreReason
            {
                NavigationId = Guid.NewGuid(),
                ActivityId = activity.NavigationId,
                ScoreReasonId = reason.NavigationId,
                ScoreReason = reason,
                CreatedAt = now,
                CreatedBy = userId,
                Active = true
            });
        }

        return await UpdateAsync(activity);
    }

    private static List<ValidationFailure> Validate(ScoreActivityRequest request, List<ScoreReason> reasons)
    {
        var failures = new List<ValidationFailure>();

        if (request.SelfScore is < 1 or > 5)
            failures.Add(new ValidationFailure(nameof(request.SelfScore), "A nota deve ser entre 1 e 5."));

        if (request.ScoreReasonIds.Distinct().Count() != request.ScoreReasonIds.Count)
            failures.Add(new ValidationFailure(nameof(request.ScoreReasonIds), "Cada justificativa só pode ser escolhida uma vez."));

        var foundIds = reasons.Select(r => r.NavigationId).ToHashSet();
        foreach (var missingId in request.ScoreReasonIds.Where(id => !foundIds.Contains(id)).Distinct())
            failures.Add(new ValidationFailure(nameof(request.ScoreReasonIds), $"Justificativa {missingId} não encontrada."));

        var expectedSentiment = request.SelfScore >= PositiveScoreThreshold ? ScoreReasonSentiment.Positive : ScoreReasonSentiment.Negative;
        foreach (var reason in reasons.Where(r => r.Sentiment != expectedSentiment))
            failures.Add(new ValidationFailure(nameof(request.ScoreReasonIds),
                $"A justificativa \"{reason.Description}\" não combina com nota {request.SelfScore}."));

        if (reasons.Any(r => r.RequiresComment) && string.IsNullOrWhiteSpace(request.SelfScoreComment))
            failures.Add(new ValidationFailure(nameof(request.SelfScoreComment), "Descreva a justificativa no comentário."));

        return failures;
    }
}
