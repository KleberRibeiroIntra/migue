namespace Migue.Domain.Entities;

/// <summary>Um artigo pode ter várias tags (ex: Agilidade e Carreira).</summary>
public record ArticleTag : BaseEntity
{
    public Guid ArticleId { get; set; }
    public Guid TagId { get; set; }

    public Article? Article { get; set; }
    public Tag? Tag { get; set; }
}
