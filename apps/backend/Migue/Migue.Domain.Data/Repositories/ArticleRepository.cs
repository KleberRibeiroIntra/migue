using Microsoft.EntityFrameworkCore;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.Data.Repositories;

public class ArticleRepository : RepositoryBase<Article>, IArticleRepository
{
    public ArticleRepository(MigueDbContext context) : base(context)
    {
    }

    public Task<List<Article>> GetPublishedAsync() =>
        Published()
            .OrderByDescending(a => a.PublishedAt)
            .ToListAsync();

    public Task<Article?> GetPublishedBySlugAsync(string slug) =>
        Published().FirstOrDefaultAsync(a => a.Slug == slug);

    private IQueryable<Article> Published() =>
        DbSet
            .Include(a => a.Tags.Where(t => t.Active))
            .ThenInclude(t => t.Tag)
            .Where(a => a.Active && a.PublishedAt != null)
            .AsSplitQuery();
}
