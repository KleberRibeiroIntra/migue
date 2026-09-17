using Migue.Domain.Entities;
using Migue.Domain.Repositories;
using Migue.Domain.Services;

namespace Migue.Domain.AppService.Services;

public class ActivityService : ServiceBase<Activity>, IActivityService
{
    public ActivityService(IActivityRepository repository) : base(repository)
    {
    }
}
