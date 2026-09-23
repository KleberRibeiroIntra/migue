using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Migue.Domain.Entities;

namespace Migue.Domain.Data.Configurations;

public class UserSoftSkillAnswerConfiguration : IEntityTypeConfiguration<UserSoftSkillAnswer>
{
    public void Configure(EntityTypeBuilder<UserSoftSkillAnswer> builder)
    {
        builder.HasIndex(a => a.NavigationId).IsUnique();
        builder.HasIndex(a => new { a.UserId, a.SoftSkillId, a.CreatedAt });

        builder.HasOne(a => a.User)
            .WithMany(u => u.SoftSkillAnswers)
            .HasForeignKey(a => a.UserId)
            .HasPrincipalKey(u => u.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(a => a.SoftSkill)
            .WithMany(s => s.Answers)
            .HasForeignKey(a => a.SoftSkillId)
            .HasPrincipalKey(s => s.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(a => a.SoftSkillOption)
            .WithMany(o => o.Answers)
            .HasForeignKey(a => a.SoftSkillOptionId)
            .HasPrincipalKey(o => o.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
