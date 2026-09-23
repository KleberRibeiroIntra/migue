using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Migue.Domain.Entities;

namespace Migue.Domain.Data.Configurations;

public class CompetencyAssessmentConfiguration : IEntityTypeConfiguration<CompetencyAssessment>
{
    public void Configure(EntityTypeBuilder<CompetencyAssessment> builder)
    {
        builder.HasIndex(a => a.NavigationId).IsUnique();
        builder.HasIndex(a => new { a.UserId, a.Status });

        builder.HasOne(a => a.User)
            .WithMany(u => u.CompetencyAssessments)
            .HasForeignKey(a => a.UserId)
            .HasPrincipalKey(u => u.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
