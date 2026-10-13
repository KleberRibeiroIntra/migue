using Microsoft.EntityFrameworkCore;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.Data.Repositories;

public class ArticleRepository : RepositoryBase<Article>, IArticleRepository
{
    public ArticleRepository(MigueDbContext context) : base(context)
    {
    }

    /// <summary>Traz as tags junto, inclusive de rascunho: é o que a edição usa.</summary>
    public override Task<Article?> GetByIdAsync(Guid id) =>
        WithTags().FirstOrDefaultAsync(a => a.NavigationId == id && a.Active);

    public Task<List<Article>> GetPublishedAsync() =>
        Published()
            .OrderByDescending(a => a.PublishedAt)
            .ToListAsync();

    public Task<Article?> GetPublishedBySlugAsync(string slug) =>
        Published().FirstOrDefaultAsync(a => a.Slug == slug);

    public Task<bool> SlugExistsAsync(string slug, Guid exceptId) =>
        DbSet.AnyAsync(a => a.Slug == slug && a.NavigationId != exceptId && a.Active);

    public Task<List<Tag>> GetActiveTagsAsync() =>
        Context.Set<Tag>()
            .Where(t => t.Active)
            .OrderBy(t => t.Name)
            .ToListAsync();

    public Task<List<Tag>> GetTagsAsync(List<Guid> tagIds) =>
        Context.Set<Tag>()
            .Where(t => tagIds.Contains(t.NavigationId) && t.Active)
            .ToListAsync();

    private IQueryable<Article> Published() =>
        WithTags().Where(a => a.Active && a.PublishedAt != null);

    private IQueryable<Article> WithTags() =>
        DbSet
            .Include(a => a.Tags.Where(t => t.Active))
            .ThenInclude(t => t.Tag)
            .AsSplitQuery();
}
