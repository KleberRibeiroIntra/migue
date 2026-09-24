namespace Migue.Domain.AppService.Dtos.Responses;

/// <summary>Análise da última autoavaliação de soft skills: pontos fortes, fracos, dicas e evolução.</summary>
public class SoftSkillReportResponse
{
    public DateTime AnsweredAt { get; set; }
    /// <summary>Data da autoavaliação anterior, se houver (base da evolução).</summary>
    public DateTime? PreviousAnsweredAt { get; set; }
    /// <summary>Média das notas, de 1 a 5.</summary>
    public double Average { get; set; }
    public string Verdict { get; set; } = string.Empty;
    public string VerdictDetail { get; set; } = string.Empty;
    /// <summary>Alertas sobre a própria autoavaliação (ex.: nota igual em tudo).</summary>
    public List<string> Warnings { get; set; } = new();

    /// <summary>Notas 4 e 5.</summary>
    public List<SoftSkillReportItemResponse> Strengths { get; set; } = new();
    /// <summary>Nota 3.</summary>
    public List<SoftSkillReportItemResponse> Neutral { get; set; } = new();
    /// <summary>Notas 1 e 2.</summary>
    public List<SoftSkillReportItemResponse> Weaknesses { get; set; } = new();
}

public class SoftSkillReportItemResponse
{
    public Guid SoftSkillId { get; set; }
    public string Name { get; set; } = string.Empty;
    /// <summary>Nota de 1 a 5.</summary>
    public int Value { get; set; }
    public string Label { get; set; } = string.Empty;
    /// <summary>Nota na autoavaliação anterior, se houver.</summary>
    public int? PreviousValue { get; set; }
    /// <summary>O que a nota quer dizer, sem rodeio.</summary>
    public string Summary { get; set; } = string.Empty;
    public List<string> Tips { get; set; } = new();
    /// <summary>Nota (0 a 100) da competência equivalente no questionário situacional, se ele já foi enviado.</summary>
    public int? BehaviorScore { get; set; }
    /// <summary>Preenchido quando a autoavaliação e o questionário situacional discordam muito.</summary>
    public string? BehaviorGap { get; set; }
}
