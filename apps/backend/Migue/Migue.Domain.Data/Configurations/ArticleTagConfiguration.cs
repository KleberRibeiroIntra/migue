using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Migue.Domain.Entities;

namespace Migue.Domain.Data.Configurations;

public class ArticleTagConfiguration : IEntityTypeConfiguration<ArticleTag>
{
    public void Configure(EntityTypeBuilder<ArticleTag> builder)
    {
        builder.HasIndex(a => a.NavigationId).IsUnique();
        builder.HasIndex(a => new { a.ArticleId, a.TagId }).IsUnique();

        // Cascade: o vínculo pertence ao artigo, então tirar da coleção (ou apagar o artigo) apaga a linha.
        builder.HasOne(a => a.Article)
            .WithMany(a => a.Tags)
            .HasForeignKey(a => a.ArticleId)
            .HasPrincipalKey(a => a.NavigationId)
            .OnDelete(DeleteBehavior.Cascade);

        // Restrict: tag em uso não pode ser apagada de verdade.
        builder.HasOne(a => a.Tag)
            .WithMany(t => t.Articles)
            .HasForeignKey(a => a.TagId)
            .HasPrincipalKey(t => t.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
