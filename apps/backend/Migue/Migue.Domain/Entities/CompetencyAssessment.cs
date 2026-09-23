using Migue.Domain.Enums;

namespace Migue.Domain.Entities;

// Uma rodada do questionário de comportamento. Enquanto Draft as respostas são salvas/alteradas a cada clique;
// ao enviar vira Submitted e fica congelada como histórico. Uma nova rodada cria outro assessment.
public record CompetencyAssessment : BaseEntity
{
    public Guid UserId { get; set; }
    public CompetencyAssessmentStatus Status { get; set; }
    public DateTime? SubmittedAt { get; set; }

    public User? User { get; set; }
    public ICollection<UserCompetencyAnswer> Answers { get; set; } = new List<UserCompetencyAnswer>();
}
