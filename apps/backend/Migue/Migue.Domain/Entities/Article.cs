namespace Migue.Domain.Entities;

public record Article : BaseEntity
{
    public Guid AuthorId { get; set; }
    public string Title { get; set; } = string.Empty;
    /// <summary>Pedaço da URL do artigo (ex: "como-nao-dar-migue").</summary>
    public string Slug { get; set; } = string.Empty;
    public string? Summary { get; set; }
    public string Content { get; set; } = string.Empty;
    /// <summary>Nulo enquanto for rascunho.</summary>
    public DateTime? PublishedAt { get; set; }

    public ICollection<ArticleTag> Tags { get; set; } = [];
}
