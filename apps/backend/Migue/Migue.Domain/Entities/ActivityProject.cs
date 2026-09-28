namespace Migue.Domain.Entities;

/// <summary>Uma atividade pode tocar mais de um projeto (ex: integração que mexe no CDC também).</summary>
public record ActivityProject : BaseEntity
{
    public Guid ActivityId { get; set; }
    public Guid ProjectId { get; set; }

    public Activity? Activity { get; set; }
    public Project? Project { get; set; }
}
