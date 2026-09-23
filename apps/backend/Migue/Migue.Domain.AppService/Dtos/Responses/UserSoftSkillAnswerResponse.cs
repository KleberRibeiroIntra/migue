namespace Migue.Domain.AppService.Dtos.Responses;

public class UserSoftSkillAnswerResponse
{
    public Guid Id { get; set; }
    public Guid SoftSkillId { get; set; }
    public Guid SoftSkillOptionId { get; set; }
    public int Value { get; set; }
    public string Label { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
