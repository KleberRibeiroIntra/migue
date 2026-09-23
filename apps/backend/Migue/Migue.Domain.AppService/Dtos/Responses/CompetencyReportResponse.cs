namespace Migue.Domain.AppService.Dtos.Responses;

/// <summary>Relatório do último questionário de comportamento enviado.</summary>
public class CompetencyReportResponse
{
    public Guid AssessmentId { get; set; }
    public DateTime SubmittedAt { get; set; }
    public int TotalQuestions { get; set; }

    /// <summary>Nota geral de 0 a 100.</summary>
    public int OverallScore { get; set; }
    public string Verdict { get; set; } = string.Empty;
    public string VerdictDetail { get; set; } = string.Empty;

    public CompetencyReportMoodResponse Mood { get; set; } = new();
    public CompetencyReportPaceResponse Pace { get; set; } = new();
    public List<CompetencyReportPatternResponse> Patterns { get; set; } = new();
    public List<CompetencyReportScoreResponse> Competencies { get; set; } = new();
    public List<CompetencyReportImprovementResponse> Improvements { get; set; } = new();
    public List<CompetencyReportScoreResponse> Strengths { get; set; } = new();
}

/// <summary>Leitura do estado emocional no momento do preenchimento, com as evidências que levaram a ela.</summary>
public class CompetencyReportMoodResponse
{
    /// <summary>0 Tranquilo, 1 Tenso, 2 Estressado, 3 No limite.</summary>
    public int Level { get; set; }
    public string Label { get; set; } = string.Empty;
    /// <summary>Índice de pressão de 0 a 100.</summary>
    public int Score { get; set; }
    public string Headline { get; set; } = string.Empty;
    public string Detail { get; set; } = string.Empty;
    public List<string> Evidence { get; set; } = new();
}

/// <summary>Como o questionário foi preenchido, a partir do horário de cada resposta salva automaticamente.</summary>
public class CompetencyReportPaceResponse
{
    /// <summary>Respostas escolhidas nesta rodada (as copiadas da rodada anterior e não revisadas não contam).</summary>
    public int AnsweredInRound { get; set; }
    public DateTime? StartedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
    public int ActiveMinutes { get; set; }
    public double? MedianSecondsPerAnswer { get; set; }
    /// <summary>Respostas dadas em menos tempo do que dá pra ler a pergunta.</summary>
    public int FastAnswers { get; set; }
    /// <summary>Intervalos de mais de 10 minutos sem responder.</summary>
    public int Pauses { get; set; }
    public int TotalChanges { get; set; }
    public bool AnsweredLateNight { get; set; }
}

public class CompetencyReportPatternResponse
{
    public string Signal { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public string Meaning { get; set; } = string.Empty;
    public int Count { get; set; }
    public bool IsPressureSignal { get; set; }
}

public class CompetencyReportScoreResponse
{
    public Guid CompetencyId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Order { get; set; }
    /// <summary>0 a 100.</summary>
    public int Score { get; set; }
    public string Level { get; set; } = string.Empty;
}

public class CompetencyReportImprovementResponse
{
    public string Competency { get; set; } = string.Empty;
    public int Score { get; set; }
    public string Level { get; set; } = string.Empty;
    public string Problem { get; set; } = string.Empty;
    public List<string> Actions { get; set; } = new();
    public List<CompetencyReportWeakAnswerResponse> WeakAnswers { get; set; } = new();
}

public class CompetencyReportWeakAnswerResponse
{
    public string Question { get; set; } = string.Empty;
    public string YourAnswer { get; set; } = string.Empty;
    public string BetterAnswer { get; set; } = string.Empty;
    public string Why { get; set; } = string.Empty;
}
