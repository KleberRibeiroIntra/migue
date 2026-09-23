namespace Migue.Domain.AppService.Dtos.Responses;

public class CompetencyQuestionResponse
{
    public Guid Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public int Order { get; set; }
    public List<CompetencyQuestionOptionResponse> Options { get; set; } = new();
}
