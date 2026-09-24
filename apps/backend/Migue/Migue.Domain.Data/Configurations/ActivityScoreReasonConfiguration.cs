using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Migue.Domain.Entities;

namespace Migue.Domain.Data.Configurations;

public class ActivityScoreReasonConfiguration : IEntityTypeConfiguration<ActivityScoreReason>
{
    public void Configure(EntityTypeBuilder<ActivityScoreReason> builder)
    {
        builder.HasIndex(a => a.NavigationId).IsUnique();
        builder.HasIndex(a => new { a.ActivityId, a.ScoreReasonId }).IsUnique();

        // Cascade: as justificativas pertencem à atividade, então removê-las da coleção (ou apagar a atividade) apaga as linhas.
        builder.HasOne(a => a.Activity)
            .WithMany(a => a.ScoreReasons)
            .HasForeignKey(a => a.ActivityId)
            .HasPrincipalKey(a => a.NavigationId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(a => a.ScoreReason)
            .WithMany(r => r.Activities)
            .HasForeignKey(a => a.ScoreReasonId)
            .HasPrincipalKey(r => r.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
