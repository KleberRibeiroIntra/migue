namespace Migue.Domain.AppService.Dtos.Requests;

public class ProjectRequest
{
    public Guid? NavigationId { get; set; } = null;
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
}
