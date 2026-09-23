namespace Migue.Domain.AppService.Dtos.Requests;

public class CompetencyAnswerRequest
{
    public Guid CompetencyQuestionId { get; set; }
    public Guid CompetencyQuestionOptionId { get; set; }
}
