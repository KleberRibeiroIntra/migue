using Microsoft.EntityFrameworkCore;
using Migue.Domain;
using Migue.Domain.Data.Extensions;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.Data.Repositories;

public class ActivityRepository : RepositoryBase<Activity>, IActivityRepository
{
    public ActivityRepository(MigueDbContext context) : base(context)
    {
    }

    public override Task<Activity?> GetByIdAsync(Guid id) =>
        DbSet
            .Include(a => a.Projects)
            .ThenInclude(p => p.Project)
            .Include(a => a.ScoreReasons)
            .ThenInclude(r => r.ScoreReason)
            .ThenInclude(r => r!.Category)
            .FirstOrDefaultAsync(a => a.NavigationId == id && a.Active);

    public Task<List<Activity>> GetByUserAsync(Guid userId, DateTime from, DateTime to) =>
        DbSet
            .Where(a => a.Active && a.UserId == userId)
            .Where(a => (a.StartedAt ?? a.CreatedAt) >= from && (a.StartedAt ?? a.CreatedAt) < to)
            .Include(a => a.Projects)
            .ThenInclude(p => p.Project)
            .Include(a => a.ScoreReasons)
            .ThenInclude(r => r.ScoreReason)
            .ThenInclude(r => r!.Category)
            .OrderByDescending(a => a.StartedAt ?? a.CreatedAt)
            .ThenByDescending(a => a.Id)
            .AsSplitQuery()
            .ToListAsync();

    public override Task<DynamicQueryResult<Activity>> GetPagedAsync(DynamicQuery query) =>
        DbSet.Where(a => a.Active)
            .Include(a => a.Projects)
            .ThenInclude(p => p.Project)
            .Include(a => a.ScoreReasons)
            .ThenInclude(r => r.ScoreReason)
            .ThenInclude(r => r!.Category)
            .ToPagedAsync(query);
}
