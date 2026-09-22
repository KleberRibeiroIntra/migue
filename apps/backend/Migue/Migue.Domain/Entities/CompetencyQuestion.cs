namespace Migue.Domain.Entities;

public record CompetencyQuestion : BaseEntity
{
    public Guid CompetencyId { get; set; }
    public string Text { get; set; } = string.Empty;
    public int Order { get; set; }

    public Competency? Competency { get; set; }

    public ICollection<CompetencyQuestionOption> Options { get; set; } = new List<CompetencyQuestionOption>();
    public ICollection<UserCompetencyAnswer> Answers { get; set; } = new List<UserCompetencyAnswer>();
}
