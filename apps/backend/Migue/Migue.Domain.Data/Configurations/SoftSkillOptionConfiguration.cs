using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Migue.Domain.Entities;

namespace Migue.Domain.Data.Configurations;

public class SoftSkillOptionConfiguration : IEntityTypeConfiguration<SoftSkillOption>
{
    public void Configure(EntityTypeBuilder<SoftSkillOption> builder)
    {
        builder.HasIndex(o => o.NavigationId).IsUnique();

        builder.HasOne(o => o.SoftSkill)
            .WithMany(s => s.Options)
            .HasForeignKey(o => o.SoftSkillId)
            .HasPrincipalKey(s => s.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
