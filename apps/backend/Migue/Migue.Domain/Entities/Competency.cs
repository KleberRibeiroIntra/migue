namespace Migue.Domain.Entities;

public record Competency : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public int Order { get; set; }

    public ICollection<CompetencyQuestion> Questions { get; set; } = new List<CompetencyQuestion>();
}
