namespace Migue.Domain.AppService.Dtos.Requests;

public class ArticleRequest
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Summary { get; set; }
    public string Content { get; set; } = string.Empty;
    /// <summary>Desmarcar volta o artigo pra rascunho.</summary>
    public bool Published { get; set; }
    public List<Guid> TagIds { get; set; } = [];
}
