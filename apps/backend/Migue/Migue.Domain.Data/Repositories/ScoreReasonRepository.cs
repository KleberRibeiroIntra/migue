using Microsoft.EntityFrameworkCore;
using Migue.Domain.Entities;
using Migue.Domain.Enums;
using Migue.Domain.Repositories;

namespace Migue.Domain.Data.Repositories;

public class ScoreReasonRepository : RepositoryBase<ScoreReason>, IScoreReasonRepository
{
    public ScoreReasonRepository(MigueDbContext context) : base(context)
    {
    }

    public override Task<ScoreReason?> GetByIdAsync(Guid id) =>
        DbSet
            .Include(r => r.Category)
            .FirstOrDefaultAsync(r => r.NavigationId == id && r.Active);

    public Task<List<ScoreReason>> GetBySentimentAsync(ScoreReasonSentiment? sentiment) =>
        DbSet
            .Include(r => r.Category)
            .Where(r => r.Active && (sentiment == null || r.Sentiment == sentiment))
            .OrderBy(r => r.Order)
            .ToListAsync();
}
