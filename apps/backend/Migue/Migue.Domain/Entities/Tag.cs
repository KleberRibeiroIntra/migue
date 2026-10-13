namespace Migue.Domain.Entities;

public record Tag : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public ICollection<ArticleTag> Articles { get; set; } = [];
}
