namespace Migue.Domain.AppService.Dtos.Responses;

public class CompetencyResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Order { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool Active { get; set; }
    public List<CompetencyQuestionResponse> Questions { get; set; } = new();
}
