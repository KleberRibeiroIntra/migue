using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Migue.Domain.Entities;

namespace Migue.Domain.Data.Configurations;

public class SoftSkillConfiguration : IEntityTypeConfiguration<SoftSkill>
{
    public void Configure(EntityTypeBuilder<SoftSkill> builder)
    {
        builder.HasIndex(s => s.NavigationId).IsUnique();
    }
}
