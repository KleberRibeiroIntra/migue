namespace Migue.Domain.Entities;

public record User : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;

    public ICollection<UserCompetencyAnswer> CompetencyAnswers { get; set; } = [];
    public ICollection<CompetencyAssessment> CompetencyAssessments { get; set; } = [];
    public ICollection<UserSoftSkillAnswer> SoftSkillAnswers { get; set; } = [];
}
