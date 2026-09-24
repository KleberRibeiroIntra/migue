using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Services;

public interface IActivityService : IServiceBase<Activity, ActivityRequest, ActivityResponse>
{
    /// <summary>Registra (ou substitui) a autoavaliação do usuário na atividade: nota, comentário e justificativas. Null se a atividade não existir ou não for do usuário.</summary>
    Task<ActivityResponse?> ScoreAsync(Guid activityId, Guid userId, ScoreActivityRequest request);
}
