using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Services;

public interface IScoreReasonCategoryService
    : IServiceBase<ScoreReasonCategory, ScoreReasonCategoryRequest, ScoreReasonCategoryResponse>
{
    /// <summary>Categorias ativas na ordem de exibição (pra popular selects).</summary>
    Task<List<ScoreReasonCategoryResponse>> GetActiveAsync();

    /// <summary>Categoria com justificativa não pode ser apagada (a FK é Restrict).</summary>
    Task<bool> HasScoreReasonsAsync(Guid navigationId);
}
