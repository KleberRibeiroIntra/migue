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
        services.AddScoped<ICompetencyAssessmentRepository, CompetencyAssessmentRepository>();
        services.AddScoped<ICompetencyRepository, CompetencyRepository>();
        services.AddScoped<IProjectRepository, ProjectRepository>();
        services.AddScoped<IScoreReasonRepository, ScoreReasonRepository>();
        services.AddScoped<ISoftSkillRepository, SoftSkillRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IUserSoftSkillAnswerRepository, UserSoftSkillAnswerRepository>();

        services.AddScoped<IActivityService, ActivityService>();
        services.AddScoped<ICompetencyAssessmentService, CompetencyAssessmentService>();
        services.AddScoped<ICompetencyService, CompetencyService>();
        services.AddScoped<ICompetencyReportService, CompetencyReportService>();
        services.AddScoped<IProjectService, ProjectService>();
        services.AddScoped<IScoreReasonService, ScoreReasonService>();
        services.AddScoped<ISoftSkillService, SoftSkillService>();
        services.AddScoped<ISoftSkillReportService, SoftSkillReportService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IUserSoftSkillAnswerService, UserSoftSkillAnswerService>();

        services.AddAutoMapper(cfg => { }, typeof(RequestMappingProfile).Assembly);
        services.AddValidatorsFromAssemblyContaining<ProjectValidator>();

        return services;
    }
}
