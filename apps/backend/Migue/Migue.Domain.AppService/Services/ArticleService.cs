using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.AppService.Services;

public class ArticleService : ServiceBase<Article, ArticleRequest, ArticleResponse>, IArticleService
{
    private readonly IArticleRepository _articleRepository;

    public ArticleService(IArticleRepository repository, IMapper mapper, IValidator<Article> validator)
        : base(repository, mapper, validator)
    {
        _articleRepository = repository;
    }

    public async Task<List<ArticleResponse>> GetPublishedAsync()
    {
        var articles = await _articleRepository.GetPublishedAsync();
        return Mapper.Map<List<ArticleResponse>>(articles);
    }

    public async Task<ArticleResponse?> GetPublishedBySlugAsync(string slug)
    {
        var article = await _articleRepository.GetPublishedBySlugAsync(slug);
        return article is null ? null : Mapper.Map<ArticleResponse>(article);
    }

    public async Task<List<TagResponse>> GetTagsAsync()
    {
        var tags = await _articleRepository.GetActiveTagsAsync();
        return Mapper.Map<List<TagResponse>>(tags);
    }

    public async Task<ArticleResponse?> UpdateWithTagsAsync(Guid id, ArticleRequest request, Guid userId)
    {
        var article = await Repository.GetByIdAsync(id);
        if (article is null)
            return null;

        var tags = await GetTagsAsync(request.TagIds);

        var slug = request.Slug.Trim();
        if (await _articleRepository.SlugExistsAsync(slug, id))
            throw new ValidationException([new ValidationFailure(nameof(ArticleRequest.Slug), "Já tem outro artigo com esse slug.")]);

        Mapper.Map(request, article);
        article.Slug = slug;
        // mantém a data original se já estava publicado; desmarcar volta pra rascunho
        article.PublishedAt = request.Published ? article.PublishedAt ?? DateTime.UtcNow : null;
        article.UpdatedBy = userId;
        SyncTags(article, tags, userId);

        return await UpdateAsync(article);
    }

    /// <summary>Tags ativas do request; lança ValidationException se algum id repetir ou não existir.</summary>
    private async Task<List<Tag>> GetTagsAsync(List<Guid> tagIds)
    {
        var tags = await _articleRepository.GetTagsAsync(tagIds);

        var failures = new List<ValidationFailure>();
        if (tagIds.Distinct().Count() != tagIds.Count)
            failures.Add(new ValidationFailure(nameof(ArticleRequest.TagIds), "Cada tag só pode ser escolhida uma vez."));

        var foundIds = tags.Select(t => t.NavigationId).ToHashSet();
        foreach (var missingId in tagIds.Where(id => !foundIds.Contains(id)).Distinct())
            failures.Add(new ValidationFailure(nameof(ArticleRequest.TagIds), $"Tag {missingId} não encontrada."));

        if (failures.Count > 0)
            throw new ValidationException(failures);

        return tags;
    }

    /// <summary>Os vínculos que saíram da coleção são apagados (cascade), os que ficaram são mantidos.</summary>
    private static void SyncTags(Article article, List<Tag> tags, Guid userId)
    {
        var selectedIds = tags.Select(t => t.NavigationId).ToHashSet();
        foreach (var removed in article.Tags.Where(t => !selectedIds.Contains(t.TagId)).ToList())
            article.Tags.Remove(removed);

        var currentIds = article.Tags.Select(t => t.TagId).ToHashSet();
        var now = DateTime.UtcNow;
        foreach (var tag in tags.Where(t => !currentIds.Contains(t.NavigationId)))
        {
            article.Tags.Add(new ArticleTag
            {
                NavigationId = Guid.NewGuid(),
                ArticleId = article.NavigationId,
                TagId = tag.NavigationId,
                Tag = tag,
                CreatedAt = now,
                CreatedBy = userId,
                Active = true
            });
        }
    }
}
