using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;
using Migue.Domain.Enums;
using Migue.Domain.Repositories;

namespace Migue.Domain.AppService.Services;

public class CompetencyAssessmentService
    : ServiceBase<CompetencyAssessment, CompetencyAnswerRequest, CompetencyAssessmentResponse>, ICompetencyAssessmentService
{
    private readonly ICompetencyAssessmentRepository _assessmentRepository;

    public CompetencyAssessmentService(ICompetencyAssessmentRepository repository, IMapper mapper)
        : base(repository, mapper)
    {
        _assessmentRepository = repository;
    }

    public async Task<CompetencyAssessmentResponse?> GetCurrentAsync(Guid userId)
    {
        var assessment = await _assessmentRepository.GetCurrentByUserAsync(userId);
        return assessment is null ? null : Mapper.Map<CompetencyAssessmentResponse>(assessment);
    }

    public async Task<CompetencyAssessmentResponse> SaveAnswerAsync(Guid userId, CompetencyAnswerRequest request)
    {
        var questions = await _assessmentRepository.GetActiveQuestionsAsync();
        var question = questions.FirstOrDefault(q => q.NavigationId == request.CompetencyQuestionId)
            ?? throw Invalid(nameof(request.CompetencyQuestionId), "Pergunta não encontrada.");
        if (question.Options.All(o => o.NavigationId != request.CompetencyQuestionOptionId))
            throw Invalid(nameof(request.CompetencyQuestionOptionId), "Alternativa inválida para esta pergunta.");

        var draft = await GetOrCreateDraftAsync(userId);
        var now = DateTime.UtcNow;
        var answer = draft.Answers.FirstOrDefault(a => a.CompetencyQuestionId == request.CompetencyQuestionId);

        if (answer is null)
        {
            var created = NewAnswer(userId, draft.NavigationId, request.CompetencyQuestionId, request.CompetencyQuestionOptionId, now);
            created.AnsweredAt = now;
            draft.Answers.Add(created);
        }
        else
        {
            if (answer.CompetencyQuestionOptionId != request.CompetencyQuestionOptionId && answer.AnsweredAt is not null)
                answer.ChangeCount++;

            answer.CompetencyQuestionOptionId = request.CompetencyQuestionOptionId;
            answer.AnsweredAt = now;
            answer.UpdatedAt = now;
            answer.UpdatedBy = userId;
        }

        draft.UpdatedBy = userId;
        return await UpdateAsync(draft);
    }

    public async Task<CompetencyAssessmentResponse> SubmitAsync(Guid userId)
    {
        var draft = await _assessmentRepository.GetDraftByUserAsync(userId)
            ?? throw Invalid(nameof(CompetencyAssessment.Status), "Não há autoavaliação em andamento para enviar.");

        var questions = await _assessmentRepository.GetActiveQuestionsAsync();
        var answered = draft.Answers.Select(a => a.CompetencyQuestionId).ToHashSet();
        var missing = questions.Count(q => !answered.Contains(q.NavigationId));
        if (missing > 0)
            throw Invalid(nameof(draft.Answers), $"Faltam {missing} pergunta(s) para enviar.");

        draft.Status = CompetencyAssessmentStatus.Submitted;
        draft.SubmittedAt = DateTime.UtcNow;
        draft.UpdatedBy = userId;
        return await UpdateAsync(draft);
    }

    public async Task<CompetencyAssessmentResponse> RestartAsync(Guid userId)
    {
        var current = await _assessmentRepository.GetCurrentByUserAsync(userId);
        if (current?.Status == CompetencyAssessmentStatus.Draft)
            return Mapper.Map<CompetencyAssessmentResponse>(current);

        var now = DateTime.UtcNow;
        var draft = NewDraft(userId);
        draft.NavigationId = Guid.NewGuid();
        // cópias ficam com AnsweredAt null: só contam no ritmo do relatório se o usuário revisar
        foreach (var previous in current?.Answers ?? [])
            draft.Answers.Add(NewAnswer(userId, draft.NavigationId, previous.CompetencyQuestionId, previous.CompetencyQuestionOptionId, now));

        return await CreateAsync(draft);
    }

    private async Task<CompetencyAssessment> GetOrCreateDraftAsync(Guid userId) =>
        await _assessmentRepository.GetDraftByUserAsync(userId)
        ?? await Repository.AddAsync(NewDraft(userId));

    private static CompetencyAssessment NewDraft(Guid userId) => new()
    {
        UserId = userId,
        Status = CompetencyAssessmentStatus.Draft,
        CreatedBy = userId
    };

    private static UserCompetencyAnswer NewAnswer(Guid userId, Guid assessmentId, Guid questionId, Guid optionId, DateTime now) => new()
    {
        NavigationId = Guid.NewGuid(),
        UserId = userId,
        CompetencyAssessmentId = assessmentId,
        CompetencyQuestionId = questionId,
        CompetencyQuestionOptionId = optionId,
        CreatedAt = now,
        CreatedBy = userId,
        Active = true
    };

    private static ValidationException Invalid(string property, string message) =>
        new([new ValidationFailure(property, message)]);
}
