using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Migue.Domain.Entities;

namespace Migue.Domain.Data.Configurations;

public class ScoreReasonConfiguration : IEntityTypeConfiguration<ScoreReason>
{
    public void Configure(EntityTypeBuilder<ScoreReason> builder)
    {
        builder.HasIndex(r => r.NavigationId).IsUnique();
    }
}
