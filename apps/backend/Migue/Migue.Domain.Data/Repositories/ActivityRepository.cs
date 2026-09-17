using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.Data.Repositories;

public class ActivityRepository : RepositoryBase<Activity>, IActivityRepository
{
    public ActivityRepository(MigueDbContext context) : base(context)
    {
    }
}
