using Microsoft.EntityFrameworkCore;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.Data.Repositories;

public class ScoreReasonCategoryRepository : RepositoryBase<ScoreReasonCategory>, IScoreReasonCategoryRepository
{
    private readonly MigueDbContext _context;

    public ScoreReasonCategoryRepository(MigueDbContext context) : base(context)
    {
        _context = context;
    }

    public Task<List<ScoreReasonCategory>> GetActiveAsync() =>
        DbSet
            .Where(c => c.Active)
            .OrderBy(c => c.Order)
            .ThenBy(c => c.Name)
            .ToListAsync();

    public Task<bool> HasScoreReasonsAsync(Guid categoryId) =>
        _context.Set<ScoreReason>().AnyAsync(r => r.CategoryId == categoryId && r.Active);
}
