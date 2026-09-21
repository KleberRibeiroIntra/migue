using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Services;

public interface IActivityService : IServiceBase<Activity, ActivityRequest, ActivityResponse>
{
}
