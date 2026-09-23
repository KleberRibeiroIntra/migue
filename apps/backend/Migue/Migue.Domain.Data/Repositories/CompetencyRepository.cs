using Microsoft.EntityFrameworkCore;
using Migue.Domain;
using Migue.Domain.Data.Extensions;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.Data.Repositories;

public class CompetencyRepository : RepositoryBase<Competency>, ICompetencyRepository
{
    public CompetencyRepository(MigueDbContext context) : base(context)
    {
    }

    public override Task<Competency?> GetByIdAsync(Guid id) =>
        DbSet
            .Include(c => c.Questions.OrderBy(q => q.Order))
            .ThenInclude(q => q.Options.OrderBy(o => o.Order))
            .FirstOrDefaultAsync(c => c.NavigationId == id && c.Active);

    public override Task<DynamicQueryResult<Competency>> GetPagedAsync(DynamicQuery query) =>
        DbSet.Where(c => c.Active)
            .Include(c => c.Questions.OrderBy(q => q.Order))
            .ThenInclude(q => q.Options.OrderBy(o => o.Order))
            .ToPagedAsync(query);
}
