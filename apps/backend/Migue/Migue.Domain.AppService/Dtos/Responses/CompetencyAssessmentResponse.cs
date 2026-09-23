using Migue.Domain.Enums;

namespace Migue.Domain.AppService.Dtos.Responses;

public class CompetencyAssessmentResponse
{
    public Guid Id { get; set; }
    public CompetencyAssessmentStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public DateTime? SubmittedAt { get; set; }
    public List<CompetencyAnswerResponse> Answers { get; set; } = new();
}
