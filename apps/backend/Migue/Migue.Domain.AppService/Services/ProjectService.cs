using Migue.Domain.Entities;
using Migue.Domain.Repositories;
using Migue.Domain.Services;

namespace Migue.Domain.AppService.Services;

public class ProjectService : ServiceBase<Project>, IProjectService
{
    public ProjectService(IProjectRepository repository) : base(repository)
    {
    }
}
