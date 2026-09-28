using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Migue.Domain.Entities;

namespace Migue.Domain.Data.Configurations;

public class ScoreReasonCategoryConfiguration : IEntityTypeConfiguration<ScoreReasonCategory>
{
    public void Configure(EntityTypeBuilder<ScoreReasonCategory> builder)
    {
        builder.HasIndex(c => c.NavigationId).IsUnique();
    }
}
