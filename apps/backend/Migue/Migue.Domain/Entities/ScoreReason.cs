using Migue.Domain.Enums;

namespace Migue.Domain.Entities;

/// <summary>Catálogo de justificativas da autoavaliação de uma atividade (as "tags" que aparecem junto das estrelas).</summary>
public record ScoreReason : BaseEntity
{
    public string Description { get; set; } = string.Empty;
    public ScoreReasonCategory Category { get; set; }
    public ScoreReasonSentiment Sentiment { get; set; }
    public int Order { get; set; }

    /// <summary>Exige SelfScoreComment na atividade quando escolhida (ex: "Outro").</summary>
    public bool RequiresComment { get; set; }

    public ICollection<ActivityScoreReason> Activities { get; set; } = [];
}
