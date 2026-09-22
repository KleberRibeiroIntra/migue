namespace Migue.Domain.Entities;

public record CompetencyQuestionOption : BaseEntity
{
    public Guid CompetencyQuestionId { get; set; }
    public string Text { get; set; } = string.Empty;
    public int Order { get; set; }

    public CompetencyQuestion? CompetencyQuestion { get; set; }

    public ICollection<UserCompetencyAnswer> Answers { get; set; } = new List<UserCompetencyAnswer>();
}
