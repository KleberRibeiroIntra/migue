namespace Migue.Domain.Entities;

public record SoftSkill : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Note { get; set; } = string.Empty;
    public int Order { get; set; }

    public ICollection<SoftSkillOption> Options { get; set; } = new List<SoftSkillOption>();
}
