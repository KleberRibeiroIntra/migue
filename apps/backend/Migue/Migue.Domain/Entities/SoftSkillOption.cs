namespace Migue.Domain.Entities;

public record SoftSkillOption : BaseEntity
{
    public Guid SoftSkillId { get; set; }
    public int Value { get; set; }
    public string Label { get; set; } = string.Empty;
    public int Order { get; set; }

    public SoftSkill? SoftSkill { get; set; }
}
