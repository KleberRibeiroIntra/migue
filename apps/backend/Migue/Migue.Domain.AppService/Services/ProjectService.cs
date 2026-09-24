using AutoMapper;
using FluentValidation;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.AppService.Services;

public class ProjectService : ServiceBase<Project, ProjectRequest, ProjectResponse>, IProjectService
{
    public ProjectService(IProjectRepository repository, IMapper mapper, IValidator<Project> validator)
        : base(repository, mapper, validator)
    {
    }

    public bool HasActivities(Guid navigationId)
        => Repository.Query().Any(p => p.NavigationId == navigationId && p.Activities.Any());
}
