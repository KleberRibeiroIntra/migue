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
            .Include(a => a.Project)
            .Include(a => a.ScoreReasons)
            .ThenInclude(r => r.ScoreReason)
            .FirstOrDefaultAsync(a => a.NavigationId == id && a.Active);

    public override Task<DynamicQueryResult<Activity>> GetPagedAsync(DynamicQuery query) =>
        DbSet.Where(a => a.Active)
            .Include(a => a.Project)
            .Include(a => a.ScoreReasons)
            .ThenInclude(r => r.ScoreReason)
            .ToPagedAsync(query);
}
