namespace Migue.Domain.Entities;

// Resposta de uma pergunta dentro de um CompetencyAssessment. Só é alterada enquanto o assessment está em Draft.
public record UserCompetencyAnswer : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid CompetencyAssessmentId { get; set; }
    public Guid CompetencyQuestionId { get; set; }
    public Guid CompetencyQuestionOptionId { get; set; }

    /// <summary>Quando o usuário escolheu esta alternativa pela última vez. Null = copiada de uma rodada anterior sem ser revisada.</summary>
    public DateTime? AnsweredAt { get; set; }
    /// <summary>Quantas vezes o usuário trocou de alternativa nesta pergunta.</summary>
    public int ChangeCount { get; set; }

    public User? User { get; set; }
    public CompetencyAssessment? CompetencyAssessment { get; set; }
    public CompetencyQuestion? CompetencyQuestion { get; set; }
    public CompetencyQuestionOption? CompetencyQuestionOption { get; set; }
}
