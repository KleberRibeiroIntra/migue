using Migue.Domain.Entities;
using Migue.Domain.Enums;

namespace Migue.Domain.Repositories;

public interface IScoreReasonRepository : IRepositoryBase<ScoreReason>
{
    /// <summary>Justificativas ativas ordenadas por Order, opcionalmente filtradas pelo sentimento.</summary>
    Task<List<ScoreReason>> GetBySentimentAsync(ScoreReasonSentiment? sentiment);
}
