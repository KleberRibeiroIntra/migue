using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Migue.Domain.Entities;

namespace Migue.Domain.Data.Configurations;

public class CompetencyQuestionOptionConfiguration : IEntityTypeConfiguration<CompetencyQuestionOption>
{
    public void Configure(EntityTypeBuilder<CompetencyQuestionOption> builder)
    {
        builder.HasIndex(o => o.NavigationId).IsUnique();

        builder.HasOne(o => o.CompetencyQuestion)
            .WithMany(q => q.Options)
            .HasForeignKey(o => o.CompetencyQuestionId)
            .HasPrincipalKey(q => q.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
