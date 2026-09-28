using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Migue.Domain.Entities;

namespace Migue.Domain.Data.Configurations;

public class ScoreReasonConfiguration : IEntityTypeConfiguration<ScoreReason>
{
    public void Configure(EntityTypeBuilder<ScoreReason> builder)
    {
        builder.HasIndex(r => r.NavigationId).IsUnique();

        // Restrict: categoria com justificativa não pode sumir, senão o relatório perde o agrupamento.
        builder.HasOne(r => r.Category)
            .WithMany(c => c.ScoreReasons)
            .HasForeignKey(r => r.CategoryId)
            .HasPrincipalKey(c => c.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
