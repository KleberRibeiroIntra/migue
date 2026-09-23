using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Services;

public interface ICompetencyAssessmentService : IServiceBase<CompetencyAssessment, CompetencyAnswerRequest, CompetencyAssessmentResponse>
{
    /// <summary>Rascunho em andamento ou último envio do usuário; null se ele nunca respondeu.</summary>
    Task<CompetencyAssessmentResponse?> GetCurrentAsync(Guid userId);

    /// <summary>Grava (ou troca) a resposta de uma pergunta no rascunho, criando o rascunho se preciso.</summary>
    Task<CompetencyAssessmentResponse> SaveAnswerAsync(Guid userId, CompetencyAnswerRequest request);

    /// <summary>Envia o rascunho: exige todas as perguntas respondidas e muda o status para Submitted.</summary>
    Task<CompetencyAssessmentResponse> SubmitAsync(Guid userId);

    /// <summary>Abre um novo rascunho a partir das respostas do último envio.</summary>
    Task<CompetencyAssessmentResponse> RestartAsync(Guid userId);
}
