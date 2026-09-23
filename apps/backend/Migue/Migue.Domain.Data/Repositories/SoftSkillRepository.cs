using Microsoft.EntityFrameworkCore;
using Migue.Domain.Data.Extensions;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.Data.Repositories;

public class SoftSkillRepository : RepositoryBase<SoftSkill>, ISoftSkillRepository
{
    public SoftSkillRepository(MigueDbContext context) : base(context)
    {
    }

    public override Task<SoftSkill?> GetByIdAsync(Guid id) =>
        DbSet.Include(s => s.Options)
            .FirstOrDefaultAsync(s => s.NavigationId == id && s.Active);

    public override Task<DynamicQueryResult<SoftSkill>> GetPagedAsync(DynamicQuery query) =>
        DbSet.Where(s => s.Active)
            .Include(s => s.Options)
            .ToPagedAsync(query);

    public Task<List<SoftSkill>> GetAllWithOptionsAsync() =>
        DbSet.Where(s => s.Active)
            .Include(s => s.Options.Where(o => o.Active))
            .ToListAsync();
}
