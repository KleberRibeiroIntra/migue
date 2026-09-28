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
    private readonly IProjectRepository _projectRepository;
    private readonly IActivityRepository _activityRepository;

    public ActivityService(IActivityRepository repository, IScoreReasonRepository scoreReasonRepository,
        IProjectRepository projectRepository, IMapper mapper, IValidator<Activity> validator)
        : base(repository, mapper, validator)
    {
        _scoreReasonRepository = scoreReasonRepository;
        _projectRepository = projectRepository;
        _activityRepository = repository;
    }

    public async Task<List<ActivityResponse>> GetMineAsync(Guid userId, DateTime from, DateTime to)
    {
        var activities = await _activityRepository.GetByUserAsync(userId, from.ToUniversalTime(), to.ToUniversalTime());
        return Mapper.Map<List<ActivityResponse>>(activities);
    }

    public async Task<ActivityResponse> CreateWithProjectsAsync(ActivityRequest request)
    {
        var projects = await GetProjectsAsync(request.ProjectIds);

        var activity = Mapper.Map<Activity>(request);
        activity.NavigationId = Guid.NewGuid();
        SyncProjects(activity, projects, request.UserId);

        return await CreateAsync(activity);
    }

    public async Task<ActivityResponse?> UpdateWithProjectsAsync(Guid id, ActivityRequest request)
    {
        var activity = await Repository.GetByIdAsync(id);
        if (activity is null)
            return null;

        var projects = await GetProjectsAsync(request.ProjectIds);

        Mapper.Map(request, activity);
        activity.UpdatedBy = request.UserId;
        SyncProjects(activity, projects, request.UserId);

        return await UpdateAsync(activity);
    }

    /// <summary>Projetos ativos do request; lança ValidationException se algum id repetir ou não existir.</summary>
    private async Task<List<Project>> GetProjectsAsync(List<Guid> projectIds)
    {
        var projects = await _projectRepository.GetAllAsync(p => projectIds.Contains(p.NavigationId));

        var failures = new List<ValidationFailure>();
        if (projectIds.Distinct().Count() != projectIds.Count)
            failures.Add(new ValidationFailure(nameof(ActivityRequest.ProjectIds), "Cada projeto só pode ser escolhido uma vez."));

        var foundIds = projects.Select(p => p.NavigationId).ToHashSet();
        foreach (var missingId in projectIds.Where(id => !foundIds.Contains(id)).Distinct())
            failures.Add(new ValidationFailure(nameof(ActivityRequest.ProjectIds), $"Projeto {missingId} não encontrado."));

        if (failures.Count > 0)
            throw new ValidationException(failures);

        return projects;
    }

    /// <summary>Os vínculos que saíram da coleção são apagados (cascade), os que ficaram são mantidos.</summary>
    private static void SyncProjects(Activity activity, List<Project> projects, Guid userId)
    {
        var selectedIds = projects.Select(p => p.NavigationId).ToHashSet();
        foreach (var removed in activity.Projects.Where(p => !selectedIds.Contains(p.ProjectId)).ToList())
            activity.Projects.Remove(removed);

        var currentIds = activity.Projects.Select(p => p.ProjectId).ToHashSet();
        var now = DateTime.UtcNow;
        foreach (var project in projects.Where(p => !currentIds.Contains(p.NavigationId)))
        {
            activity.Projects.Add(new ActivityProject
            {
                NavigationId = Guid.NewGuid(),
                ActivityId = activity.NavigationId,
                ProjectId = project.NavigationId,
                Project = project,
                CreatedAt = now,
                CreatedBy = userId,
                Active = true
            });
        }
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
