using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Services;

public interface IActivityService : IServiceBase<Activity, ActivityRequest, ActivityResponse>
{
    /// <summary>Atividades do usuário no período [from, to), mais recentes primeiro (alimenta o dashboard).</summary>
    Task<List<ActivityResponse>> GetMineAsync(Guid userId, DateTime from, DateTime to);

    /// <summary>Cria a atividade já vinculada aos projetos do request.</summary>
    Task<ActivityResponse> CreateWithProjectsAsync(ActivityRequest request);

    /// <summary>Atualiza a atividade e sincroniza os projetos (os que saíram do request são desvinculados). Null se não existir.</summary>
    Task<ActivityResponse?> UpdateWithProjectsAsync(Guid id, ActivityRequest request);

    /// <summary>Registra (ou substitui) a autoavaliação do usuário na atividade: nota, comentário e justificativas. Null se a atividade não existir ou não for do usuário.</summary>
    Task<ActivityResponse?> ScoreAsync(Guid activityId, Guid userId, ScoreActivityRequest request);

    /// <summary>Tira a autoavaliação (nota, comentário e justificativas). Null se a atividade não existir ou não for do usuário.</summary>
    Task<ActivityResponse?> ClearScoreAsync(Guid activityId, Guid userId);
}
