using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;
using Migue.Domain.Enums;

namespace Migue.Domain.AppService.Services;

public interface IScoreReasonService : IServiceBase<ScoreReason, ScoreReasonRequest, ScoreReasonResponse>
{
    /// <summary>Justificativas ativas na ordem de exibição; sem sentimento retorna todas.</summary>
    Task<List<ScoreReasonResponse>> GetBySentimentAsync(ScoreReasonSentiment? sentiment);
}
