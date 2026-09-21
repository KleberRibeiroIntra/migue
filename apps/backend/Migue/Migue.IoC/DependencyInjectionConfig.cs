using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Migue.Domain.AppService.Mappings;
using Migue.Domain.AppService.Services;
using Migue.Domain.AppService.Validators;
using Migue.Domain.Data;
using Migue.Domain.Data.Repositories;
using Migue.Domain.Repositories;

namespace Migue.IoC;

public static class DependencyInjectionConfig
{
    public static IServiceCollection AddDependencyInjectionConfiguration(this IServiceCollection services,
        string connectionString)
    {
        services.AddDbContext<MigueDbContext>(options => options.UseSqlite(connectionString));

        services.AddScoped<IActivityRepository, ActivityRepository>();
        services.AddScoped<IProjectRepository, ProjectRepository>();
        services.AddScoped<IUserRepository, UserRepository>();

        services.AddScoped<IActivityService, ActivityService>();
        services.AddScoped<IProjectService, ProjectService>();
        services.AddScoped<IUserService, UserService>();

        services.AddAutoMapper(cfg => { }, typeof(RequestMappingProfile).Assembly);
        services.AddValidatorsFromAssemblyContaining<ProjectValidator>();

        return services;
    }
}
