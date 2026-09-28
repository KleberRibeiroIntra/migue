using Migue.Domain.Entities;

namespace Migue.Domain.Repositories;

public interface IScoreReasonCategoryRepository : IRepositoryBase<ScoreReasonCategory>
{
    /// <summary>Categorias ativas ordenadas por Order.</summary>
    Task<List<ScoreReasonCategory>> GetActiveAsync();

    Task<bool> HasScoreReasonsAsync(Guid categoryId);
}
