using Migue.Domain.Entities;

namespace Migue.Domain.Repositories;

public interface IArticleRepository : IRepositoryBase<Article>
{
    /// <summary>Artigos ativos já publicados, com as tags, mais recentes primeiro.</summary>
    Task<List<Article>> GetPublishedAsync();

    /// <summary>Artigo publicado pelo slug da URL, com as tags.</summary>
    Task<Article?> GetPublishedBySlugAsync(string slug);
}
