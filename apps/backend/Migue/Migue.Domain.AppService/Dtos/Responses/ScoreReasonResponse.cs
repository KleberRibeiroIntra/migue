using Migue.Domain.Enums;

namespace Migue.Domain.AppService.Dtos.Responses;

public class ScoreReasonResponse
{
    public Guid Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public ScoreReasonCategory Category { get; set; }
    public ScoreReasonSentiment Sentiment { get; set; }
    public int Order { get; set; }
    public bool RequiresComment { get; set; }
}
