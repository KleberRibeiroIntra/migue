using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Services;

public interface IUserSoftSkillAnswerService : IServiceBase<UserSoftSkillAnswer, UserSoftSkillAnswerRequest, UserSoftSkillAnswerResponse>
{
    /// <summary>Resposta mais recente do usuário para cada soft skill.</summary>
    Task<List<UserSoftSkillAnswerResponse>> GetLatestByUserAsync(Guid userId);

    /// <summary>Registra uma nova rodada de respostas do usuário (as anteriores ficam como histórico).</summary>
    Task<List<UserSoftSkillAnswerResponse>> SaveAsync(Guid userId, SaveUserSoftSkillAnswersRequest request);
}
