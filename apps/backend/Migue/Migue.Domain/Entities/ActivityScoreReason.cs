namespace Migue.Domain.Entities;

public record ActivityScoreReason : BaseEntity
{
    public Guid ActivityId { get; set; }
    public Guid ScoreReasonId { get; set; }

    public Activity? Activity { get; set; }
    public ScoreReason? ScoreReason { get; set; }
}
