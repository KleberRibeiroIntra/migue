namespace Migue.Domain.AppService.Dtos.Responses;

public class CompetencyQuestionOptionResponse
{
    public Guid Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public int Order { get; set; }
}
