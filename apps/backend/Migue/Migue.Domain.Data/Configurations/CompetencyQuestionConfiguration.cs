using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Migue.Domain.Entities;

namespace Migue.Domain.Data.Configurations;

public class CompetencyQuestionConfiguration : IEntityTypeConfiguration<CompetencyQuestion>
{
    public void Configure(EntityTypeBuilder<CompetencyQuestion> builder)
    {
        builder.HasIndex(q => q.NavigationId).IsUnique();

        builder.HasOne(q => q.Competency)
            .WithMany(c => c.Questions)
            .HasForeignKey(q => q.CompetencyId)
            .HasPrincipalKey(c => c.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
