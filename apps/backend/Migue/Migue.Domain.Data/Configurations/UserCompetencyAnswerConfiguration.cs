using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Migue.Domain.Entities;

namespace Migue.Domain.Data.Configurations;

public class UserCompetencyAnswerConfiguration : IEntityTypeConfiguration<UserCompetencyAnswer>
{
    public void Configure(EntityTypeBuilder<UserCompetencyAnswer> builder)
    {
        builder.HasIndex(a => a.NavigationId).IsUnique();

        builder.HasOne(a => a.User)
            .WithMany(u => u.CompetencyAnswers)
            .HasForeignKey(a => a.UserId)
            .HasPrincipalKey(u => u.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(a => a.CompetencyQuestion)
            .WithMany(q => q.Answers)
            .HasForeignKey(a => a.CompetencyQuestionId)
            .HasPrincipalKey(q => q.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(a => a.CompetencyQuestionOption)
            .WithMany(o => o.Answers)
            .HasForeignKey(a => a.CompetencyQuestionOptionId)
            .HasPrincipalKey(o => o.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
