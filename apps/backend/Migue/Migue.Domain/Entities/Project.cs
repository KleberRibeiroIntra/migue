namespace Migue.Domain.Entities;

public record Project : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
}
