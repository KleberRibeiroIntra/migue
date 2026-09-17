using Microsoft.EntityFrameworkCore;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.Data.Repositories;

public class ProjectRepository : RepositoryBase<Project>, IProjectRepository
{
    private readonly MigueDbContext _context;

    public ProjectRepository(MigueDbContext context) : base(context)
    {
        _context = context;
    }

    public Task<bool> HasActivitiesAsync(Guid projectId) =>
        _context.Set<Activity>().AnyAsync(a => a.ProjectId == projectId && a.Active);
}
