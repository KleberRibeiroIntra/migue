using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Services;

public interface IArticleService : IServiceBase<Article, ArticleRequest, ArticleResponse>
{
    /// <summary>Artigos publicados pro /blog, mais recentes primeiro.</summary>
    Task<List<ArticleResponse>> GetPublishedAsync();

    Task<ArticleResponse?> GetPublishedBySlugAsync(string slug);

    /// <summary>Atualiza o artigo e sincroniza as tags. Nulo se o artigo não existir.</summary>
    Task<ArticleResponse?> UpdateWithTagsAsync(Guid id, ArticleRequest request, Guid userId);

    Task<List<TagResponse>> GetTagsAsync();
}
