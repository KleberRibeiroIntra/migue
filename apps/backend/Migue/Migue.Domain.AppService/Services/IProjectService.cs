using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Services;

public interface IProjectService : IServiceBase<Project, ProjectRequest, ProjectResponse>
{
    /// <summary>Projeto com atividade não pode ser apagado (a FK é Restrict e o histórico se perderia).</summary>
    bool HasActivities(Guid navigationId);
}
