namespace Migue.Domain.AppService.Dtos.Requests;

public class ScoreActivityRequest
{
    public int SelfScore { get; set; }
    public string? SelfScoreComment { get; set; }
    public List<Guid> ScoreReasonIds { get; set; } = new();
}
