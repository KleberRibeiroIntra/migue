using AutoMapper;
using FluentValidation;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.AppService.Services;

public class ActivityService : ServiceBase<Activity, ActivityRequest, ActivityResponse>, IActivityService
{
    public ActivityService(IActivityRepository repository, IMapper mapper, IValidator<Activity> validator)
        : base(repository, mapper, validator)
    {
    }
}
