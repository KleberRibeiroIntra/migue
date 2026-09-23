using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.AppService.Services;

public class UserSoftSkillAnswerService
    : ServiceBase<UserSoftSkillAnswer, UserSoftSkillAnswerRequest, UserSoftSkillAnswerResponse>, IUserSoftSkillAnswerService
{
    private readonly IUserSoftSkillAnswerRepository _answerRepository;
    private readonly ISoftSkillRepository _softSkillRepository;

    public UserSoftSkillAnswerService(IUserSoftSkillAnswerRepository repository, ISoftSkillRepository softSkillRepository, IMapper mapper)
        : base(repository, mapper)
    {
        _answerRepository = repository;
        _softSkillRepository = softSkillRepository;
    }

    public async Task<List<UserSoftSkillAnswerResponse>> GetLatestByUserAsync(Guid userId)
    {
        var answers = await _answerRepository.GetLatestByUserAsync(userId);
        return Mapper.Map<List<UserSoftSkillAnswerResponse>>(answers);
    }

    public async Task<List<UserSoftSkillAnswerResponse>> SaveAsync(Guid userId, SaveUserSoftSkillAnswersRequest request)
    {
        var softSkills = await _softSkillRepository.GetAllWithOptionsAsync();
        var failures = Validate(request, softSkills);
        if (failures.Count > 0)
            throw new ValidationException(failures);

        var now = DateTime.UtcNow;
        var answers = request.Answers.Select(a => new UserSoftSkillAnswer
        {
            UserId = userId,
            SoftSkillId = a.SoftSkillId,
            SoftSkillOptionId = a.SoftSkillOptionId,
            CreatedBy = userId,
            CreatedAt = now,
            Active = true
        }).ToList();

        await Repository.AddRangeAsync(answers);
        return await GetLatestByUserAsync(userId);
    }

    private static List<ValidationFailure> Validate(SaveUserSoftSkillAnswersRequest request, List<SoftSkill> softSkills)
    {
        var failures = new List<ValidationFailure>();

        if (request.Answers.Count == 0)
            failures.Add(new ValidationFailure(nameof(request.Answers), "Informe ao menos uma resposta."));

        if (request.Answers.GroupBy(a => a.SoftSkillId).Any(g => g.Count() > 1))
            failures.Add(new ValidationFailure(nameof(request.Answers), "Cada soft skill só pode ser respondida uma vez."));

        var softSkillsById = softSkills.ToDictionary(s => s.NavigationId);
        foreach (var answer in request.Answers)
        {
            if (!softSkillsById.TryGetValue(answer.SoftSkillId, out var softSkill))
                failures.Add(new ValidationFailure(nameof(answer.SoftSkillId), $"Soft skill {answer.SoftSkillId} não encontrada."));
            else if (softSkill.Options.All(o => o.NavigationId != answer.SoftSkillOptionId))
                failures.Add(new ValidationFailure(nameof(answer.SoftSkillOptionId), $"Opção inválida para a soft skill \"{softSkill.Name}\"."));
        }

        return failures;
    }
}
