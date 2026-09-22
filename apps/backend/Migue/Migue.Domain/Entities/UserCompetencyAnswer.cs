namespace Migue.Domain.Entities;

// Cada salvamento insere uma nova linha (nunca atualiza uma existente), então o BaseEntity.CreatedAt já é o timestamp dessa resposta.
public record UserCompetencyAnswer : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid CompetencyQuestionId { get; set; }
    public Guid CompetencyQuestionOptionId { get; set; }

    public User? User { get; set; }
    public CompetencyQuestion? CompetencyQuestion { get; set; }
    public CompetencyQuestionOption? CompetencyQuestionOption { get; set; }
}
