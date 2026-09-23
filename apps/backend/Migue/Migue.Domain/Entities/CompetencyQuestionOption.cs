using Migue.Domain.Enums;

namespace Migue.Domain.Entities;

public record CompetencyQuestionOption : BaseEntity
{
    public Guid CompetencyQuestionId { get; set; }
    public string Text { get; set; } = string.Empty;
    public int Order { get; set; }

    /// <summary>Peso da alternativa no gabarito: 1 (mais fraca) a 4 (mais madura). 0 = ainda sem gabarito.</summary>
    public int Score { get; set; }
    public CompetencyOptionSignal Signal { get; set; }

    public CompetencyQuestion? CompetencyQuestion { get; set; }

    public ICollection<UserCompetencyAnswer> Answers { get; set; } = new List<UserCompetencyAnswer>();
}
