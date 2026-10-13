using Migue.Domain.Entities;

namespace Migue.Domain.Repositories;

public interface IArticleRepository : IRepositoryBase<Article>
{
    /// <summary>Artigos ativos já publicados, com as tags, mais recentes primeiro.</summary>
    Task<List<Article>> GetPublishedAsync();

    /// <summary>Artigo publicado pelo slug da URL, com as tags.</summary>
    Task<Article?> GetPublishedBySlugAsync(string slug);

    /// <summary>Outro artigo ativo já usa esse slug?</summary>
    Task<bool> SlugExistsAsync(string slug, Guid exceptId);

    /// <summary>Tags ativas em ordem alfabética.</summary>
    Task<List<Tag>> GetActiveTagsAsync();

    Task<List<Tag>> GetTagsAsync(List<Guid> tagIds);
}
