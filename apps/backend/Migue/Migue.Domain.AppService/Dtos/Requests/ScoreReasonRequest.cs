using Migue.Domain.Enums;

namespace Migue.Domain.AppService.Dtos.Requests;

public class ScoreReasonRequest
{
    public string Description { get; set; } = string.Empty;
    public ScoreReasonCategory Category { get; set; }
    public ScoreReasonSentiment Sentiment { get; set; }
    public int Order { get; set; }
    public bool RequiresComment { get; set; }
}
