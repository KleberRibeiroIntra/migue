using Migue.Domain.Enums;

namespace Migue.Domain.Entities;

public record Activity : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid? ProjectId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public ActivityStatus Status { get; set; }
    public DateTime? StartedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
    public int? DurationMinutes { get; set; }
    public int? SelfScore { get; set; }
    public string? SelfScoreComment { get; set; }

    public Project? Project { get; set; }
}
