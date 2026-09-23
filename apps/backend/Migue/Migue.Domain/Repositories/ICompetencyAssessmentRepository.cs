using Migue.Domain.Entities;

namespace Migue.Domain.Repositories;

public interface ICompetencyAssessmentRepository : IRepositoryBase<CompetencyAssessment>
{
    /// <summary>Rascunho em andamento do usuário (com as respostas), se houver.</summary>
    Task<CompetencyAssessment?> GetDraftByUserAsync(Guid userId);

    /// <summary>Rascunho em andamento ou, se não houver, o último enviado (com as respostas).</summary>
    Task<CompetencyAssessment?> GetCurrentByUserAsync(Guid userId);

    /// <summary>Último assessment enviado do usuário (com as respostas), se houver.</summary>
    Task<CompetencyAssessment?> GetLatestSubmittedByUserAsync(Guid userId);

    /// <summary>Perguntas ativas com a competência e as opções ativas.</summary>
    Task<List<CompetencyQuestion>> GetActiveQuestionsAsync();
}
