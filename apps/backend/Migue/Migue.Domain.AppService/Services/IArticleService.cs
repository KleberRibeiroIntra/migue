using Migue.Domain.AppService.Dtos.Responses;

namespace Migue.Domain.AppService.Services;

public interface IArticleService
{
    /// <summary>Artigos publicados pro /blog, mais recentes primeiro.</summary>
    Task<List<ArticleResponse>> GetPublishedAsync();

    Task<ArticleResponse?> GetPublishedBySlugAsync(string slug);
}
