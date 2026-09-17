using Migue.Domain.Entities;

namespace Migue.Domain.Repositories;

public interface IProjectRepository : IRepositoryBase<Project>
{
    Task<bool> HasActivitiesAsync(Guid projectId);
}
