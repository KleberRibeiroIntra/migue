using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.AppService.Reports;
using Migue.Domain.Entities;
using Migue.Domain.Enums;
using Migue.Domain.Repositories;

namespace Migue.Domain.AppService.Services;

/// <summary>
/// Monta o relatório do questionário de comportamento a partir do gabarito (peso e sinal de cada alternativa)
/// e do horário em que cada resposta foi salva. A leitura de humor é heurística: soma sinais de pressão
/// nas respostas com o ritmo de preenchimento e expõe as evidências usadas.
/// </summary>
public class CompetencyReportService : ICompetencyReportService
{
    private static readonly TimeSpan FastAnswer = TimeSpan.FromSeconds(4);
    private static readonly TimeSpan Pause = TimeSpan.FromMinutes(10);
    private const int MaxImprovements = 5;
    private const int MaxStrengths = 3;
    private const int ImprovementThreshold = 70;

    private readonly ICompetencyAssessmentRepository _assessmentRepository;

    public CompetencyReportService(ICompetencyAssessmentRepository assessmentRepository)
    {
        _assessmentRepository = assessmentRepository;
    }

    public async Task<CompetencyReportResponse?> GetMyReportAsync(Guid userId, int timezoneOffsetMinutes)
    {
        var assessment = await _assessmentRepository.GetLatestSubmittedByUserAsync(userId);
        if (assessment is null)
            return null;

        var questions = (await _assessmentRepository.GetActiveQuestionsAsync()).ToDictionary(q => q.NavigationId);
        var answers = assessment.Answers
            .Select(a => ToScoredAnswer(a, questions))
            .OfType<ScoredAnswer>()
            .ToList();

        var competencies = BuildCompetencyScores(answers);
        var overall = answers.Count == 0 ? 0 : ToPercent(answers.Average(a => a.Option.Score));
        var (verdict, verdictDetail) = CompetencyReportTexts.Verdict(overall);
        var pace = BuildPace(assessment.Answers, timezoneOffsetMinutes);
        var patterns = BuildPatterns(answers);

        return new CompetencyReportResponse
        {
            AssessmentId = assessment.NavigationId,
            SubmittedAt = assessment.SubmittedAt ?? assessment.UpdatedAt ?? assessment.CreatedAt,
            TotalQuestions = answers.Count,
            OverallScore = overall,
            Verdict = verdict,
            VerdictDetail = verdictDetail,
            Mood = BuildMood(answers, pace),
            Pace = pace,
            Patterns = patterns,
            Competencies = competencies,
            Improvements = BuildImprovements(answers, competencies),
            Strengths = competencies
                .Where(c => c.Score >= ImprovementThreshold)
                .OrderByDescending(c => c.Score).ThenBy(c => c.Order)
                .Take(MaxStrengths)
                .ToList(),
        };
    }

    private sealed record ScoredAnswer(UserCompetencyAnswer Answer, CompetencyQuestion Question, CompetencyQuestionOption Option);

    private static ScoredAnswer? ToScoredAnswer(UserCompetencyAnswer answer, Dictionary<Guid, CompetencyQuestion> questions)
    {
        if (!questions.TryGetValue(answer.CompetencyQuestionId, out var question))
            return null;
        var option = question.Options.FirstOrDefault(o => o.NavigationId == answer.CompetencyQuestionOptionId);
        // alternativas sem gabarito (Score 0) não entram na conta
        return option is null || option.Score == 0 ? null : new ScoredAnswer(answer, question, option);
    }

    /// <summary>Converte a média de peso (1 a 4) em nota de 0 a 100.</summary>
    private static int ToPercent(double averageScore) => (int)Math.Round((averageScore - 1) / 3 * 100);

    private static List<CompetencyReportScoreResponse> BuildCompetencyScores(List<ScoredAnswer> answers) =>
        answers
            .GroupBy(a => a.Question.Competency!)
            .Select(g =>
            {
                var score = ToPercent(g.Average(a => a.Option.Score));
                return new CompetencyReportScoreResponse
                {
                    CompetencyId = g.Key.NavigationId,
                    Name = g.Key.Name,
                    Order = g.Key.Order,
                    Score = score,
                    Level = CompetencyReportTexts.CompetencyLevel(score),
                };
            })
            .OrderBy(c => c.Order)
            .ToList();

    private static List<CompetencyReportPatternResponse> BuildPatterns(List<ScoredAnswer> answers) =>
        answers
            .Where(a => a.Option.Signal != CompetencyOptionSignal.None)
            .GroupBy(a => a.Option.Signal)
            .Select(g => new CompetencyReportPatternResponse
            {
                Signal = g.Key.ToString(),
                Label = CompetencyReportTexts.Signals[g.Key].Label,
                Meaning = CompetencyReportTexts.Signals[g.Key].Meaning,
                Count = g.Count(),
                IsPressureSignal = CompetencyReportTexts.PressureSignals.Contains(g.Key),
            })
            .OrderByDescending(p => p.Count)
            .ToList();

    private static List<CompetencyReportImprovementResponse> BuildImprovements(
        List<ScoredAnswer> answers, List<CompetencyReportScoreResponse> competencies) =>
        competencies
            .Where(c => c.Score < ImprovementThreshold)
            .OrderBy(c => c.Score).ThenBy(c => c.Order)
            .Take(MaxImprovements)
            .Select(c =>
            {
                var (problem, actions) = CompetencyReportTexts.Competencies.GetValueOrDefault(c.Name,
                    ("Suas respostas aqui ficaram abaixo do esperado.", ["Releia as perguntas desta competência e compare com a melhor alternativa."]));

                return new CompetencyReportImprovementResponse
                {
                    Competency = c.Name,
                    Score = c.Score,
                    Level = c.Level,
                    Problem = problem,
                    Actions = [.. actions],
                    WeakAnswers = answers
                        .Where(a => a.Question.Competency!.NavigationId == c.CompetencyId && a.Option.Score <= 2)
                        .OrderBy(a => a.Option.Score).ThenBy(a => a.Question.Order)
                        .Select(a => new CompetencyReportWeakAnswerResponse
                        {
                            Question = a.Question.Text,
                            YourAnswer = a.Option.Text,
                            BetterAnswer = a.Question.Options.OrderByDescending(o => o.Score).First().Text,
                            Why = CompetencyReportTexts.WeakAnswerReason(a.Option.Signal, a.Option.Score),
                        })
                        .ToList(),
                };
            })
            .ToList();

    private static CompetencyReportPaceResponse BuildPace(IEnumerable<UserCompetencyAnswer> answers, int timezoneOffsetMinutes)
    {
        var times = answers
            .Where(a => a.AnsweredAt is not null)
            .Select(a => a.AnsweredAt!.Value)
            .Order()
            .ToList();

        var pace = new CompetencyReportPaceResponse
        {
            AnsweredInRound = times.Count,
            StartedAt = times.Count > 0 ? times[0] : null,
            FinishedAt = times.Count > 0 ? times[^1] : null,
            TotalChanges = answers.Sum(a => a.ChangeCount),
        };
        if (times.Count < 2)
            return pace;

        var gaps = times.Zip(times.Skip(1), (previous, next) => next - previous).ToList();
        var activeGaps = gaps.Where(g => g <= Pause).OrderBy(g => g).ToList();

        pace.Pauses = gaps.Count - activeGaps.Count;
        pace.FastAnswers = activeGaps.Count(g => g < FastAnswer);
        pace.ActiveMinutes = (int)Math.Round(activeGaps.Sum(g => g.TotalMinutes));
        pace.MedianSecondsPerAnswer = activeGaps.Count == 0 ? null : Math.Round(activeGaps[activeGaps.Count / 2].TotalSeconds, 1);

        // a maioria das respostas entre 22h e 6h no horário do usuário
        var lateNight = times.Count(t =>
        {
            var hour = t.AddMinutes(-timezoneOffsetMinutes).Hour;
            return hour >= 22 || hour < 6;
        });
        pace.AnsweredLateNight = lateNight * 2 > times.Count;

        return pace;
    }

    private static CompetencyReportMoodResponse BuildMood(List<ScoredAnswer> answers, CompetencyReportPaceResponse pace)
    {
        var evidence = new List<string>();
        var points = 0.0;

        var pressureAnswers = answers.Where(a => CompetencyReportTexts.PressureSignals.Contains(a.Option.Signal)).ToList();
        if (pressureAnswers.Count > 0)
        {
            points += pressureAnswers.Count * 3;
            var top = pressureAnswers
                .GroupBy(a => a.Option.Signal)
                .OrderByDescending(g => g.Count())
                .Take(3)
                .Select(g => $"\"{CompetencyReportTexts.Signals[g.Key].Label}\" ({g.Count()}x)");
            evidence.Add($"{pressureAnswers.Count} das {answers.Count} respostas são reflexo típico de quem está sob pressão: {string.Join(", ", top)}.");
        }

        if (answers.Any(a => a.Option.Signal == CompetencyOptionSignal.Irritability))
        {
            points += 8;
            evidence.Add("Você mesmo marcou que fica mais impaciente quando está sob pressão.");
        }

        var weakPressureAnswers = answers
            .Where(a => CompetencyReportTexts.PressureCompetencies.Contains(a.Question.Competency!.Name) && a.Option.Score <= 2)
            .ToList();
        if (weakPressureAnswers.Count > 0)
        {
            points += weakPressureAnswers.Count * 6;
            evidence.Add($"Nas perguntas sobre pressão e frustração, {weakPressureAnswers.Count} das suas respostas foram as mais fracas (ex.: \"{weakPressureAnswers[0].Option.Text}\").");
        }

        var measuredGaps = pace.AnsweredInRound - 1 - pace.Pauses;
        if (measuredGaps > 0)
        {
            var fastRatio = (double)pace.FastAnswers / measuredGaps;
            if (fastRatio >= 0.25)
            {
                points += fastRatio * 40;
                evidence.Add($"{pace.FastAnswers} respostas vieram em menos de {FastAnswer.TotalSeconds:0} segundos — tempo curto demais pra ler a pergunta e as 4 alternativas. Pressa ou piloto automático.");
            }
        }

        if (pace.AnsweredLateNight)
        {
            points += 10;
            evidence.Add("A maior parte do questionário foi respondida entre 22h e 6h.");
        }

        if (pace.TotalChanges >= 8)
        {
            points += 6;
            evidence.Add($"Você mudou de resposta {pace.TotalChanges} vezes. Muita hesitação costuma vir junto com cansaço ou insegurança.");
        }

        if (pace.AnsweredInRound == 0)
            evidence.Add("Não há horário registrado das respostas desta rodada (respostas copiadas de uma rodada anterior ou enviadas antes do salvamento automático), então o ritmo de preenchimento ficou de fora desta leitura.");

        var score = (int)Math.Clamp(Math.Round(points), 0, 100);
        var level = score switch { < 25 => 0, < 45 => 1, < 65 => 2, _ => 3 };
        var (label, headline, detail) = CompetencyReportTexts.Mood(level);
        if (evidence.Count == 0)
            evidence.Add("Nenhum sinal relevante de pressão nas respostas nem no ritmo de preenchimento.");

        return new CompetencyReportMoodResponse
        {
            Level = level,
            Label = label,
            Score = score,
            Headline = headline,
            Detail = detail,
            Evidence = evidence,
        };
    }
}
