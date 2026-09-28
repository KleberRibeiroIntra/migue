using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Migue.Domain.Entities;

namespace Migue.Domain.Data.Configurations;

public class ActivityProjectConfiguration : IEntityTypeConfiguration<ActivityProject>
{
    public void Configure(EntityTypeBuilder<ActivityProject> builder)
    {
        builder.HasIndex(a => a.NavigationId).IsUnique();
        builder.HasIndex(a => new { a.ActivityId, a.ProjectId }).IsUnique();

        // Cascade: o vínculo pertence à atividade, então tirar da coleção (ou apagar a atividade) apaga a linha.
        builder.HasOne(a => a.Activity)
            .WithMany(a => a.Projects)
            .HasForeignKey(a => a.ActivityId)
            .HasPrincipalKey(a => a.NavigationId)
            .OnDelete(DeleteBehavior.Cascade);

        // Restrict: projeto com atividade não pode ser apagado, senão o histórico se perde.
        builder.HasOne(a => a.Project)
            .WithMany(p => p.Activities)
            .HasForeignKey(a => a.ProjectId)
            .HasPrincipalKey(p => p.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
