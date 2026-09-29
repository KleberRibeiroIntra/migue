using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Services;

public interface IProjectService : IServiceBase<Project, ProjectRequest, ProjectResponse>
{
    /// <summary>Projeto com atividade ativa não pode ser excluído: as atividades ficariam apontando pra um projeto inativo.</summary>
    Task<bool> HasActivitiesAsync(Guid navigationId);
}
