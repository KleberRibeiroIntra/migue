namespace Migue.Domain.AppService.Dtos.Requests;

public class ScoreReasonCategoryRequest
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Order { get; set; }
}
