namespace Migue.Domain.AppService.Dtos.Responses;

public class SoftSkillOptionResponse
{
    public Guid Id { get; set; }
    public int Value { get; set; }
    public string Label { get; set; } = string.Empty;
    public int Order { get; set; }
}
