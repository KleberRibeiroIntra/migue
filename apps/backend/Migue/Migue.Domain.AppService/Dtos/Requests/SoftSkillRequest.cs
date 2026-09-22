namespace Migue.Domain.AppService.Dtos.Requests;

public class SoftSkillRequest
{
    public Guid? NavigationId { get; set; } = null;
    public string Name { get; set; } = string.Empty;
    public string Note { get; set; } = string.Empty;
    public int Order { get; set; }
}
