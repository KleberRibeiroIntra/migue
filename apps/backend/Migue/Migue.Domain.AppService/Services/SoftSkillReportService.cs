using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.AppService.Reports;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.AppService.Services;

/// <summary>
/// Analisa a última autoavaliação de soft skills: separa pontos fortes / morno / fracos, compara com a rodada
/// anterior e confronta a nota que a pessoa se deu com o questionário situacional, quando existe.
/// </summary>
public class SoftSkillReportService : ISoftSkillReportService
{
    /// <summary>Diferença (em pontos de 0 a 100) entre autoavaliação e questionário situacional a partir da qual vale apontar.</summary>
    private const int BehaviorGapThreshold = 30;

    private readonly IUserSoftSkillAnswerRepository _answerRepository;
    private readonly ICompetencyReportService _competencyReportService;

    public SoftSkillReportService(IUserSoftSkillAnswerRepository answerRepository, ICompetencyReportService competencyReportService)
    {
        _answerRepository = answerRepository;
        _competencyReportService = competencyReportService;
    }

    public async Task<SoftSkillReportResponse?> GetMyReportAsync(Guid userId)
    {
        var history = await _answerRepository.GetAllByUserAsync(userId);
        if (history.Count == 0)
            return null;

        // cada soft skill: [0] = resposta mais recente, [1] = a anterior
        var bySkill = history
            .Where(a => a.SoftSkill is { Active: true } && a.SoftSkillOption is not null)
            .GroupBy(a => a.SoftSkillId)
            .Select(g => g.OrderByDescending(a => a.CreatedAt).ThenByDescending(a => a.Id).Take(2).ToList())
            .OrderBy(g => g[0].SoftSkill!.Order)
            .ToList();
        if (bySkill.Count == 0)
            return null;

        var behaviorScores = await GetBehaviorScoresAsync(userId);
        var items = bySkill.Select(answers => BuildItem(answers[0], answers.ElementAtOrDefault(1), behaviorScores)).ToList();

        var average = Math.Round(items.Average(i => i.Value), 1);
        var (verdict, verdictDetail) = SoftSkillReportTexts.Verdict(average);

        return new SoftSkillReportResponse
        {
            AnsweredAt = bySkill.Max(g => g[0].CreatedAt),
            PreviousAnsweredAt = bySkill.Select(g => g.ElementAtOrDefault(1)?.CreatedAt).Where(d => d is not null).Max(),
            Average = average,
            Verdict = verdict,
            VerdictDetail = verdictDetail,
            Warnings = BuildWarnings(items),
            Strengths = items.Where(i => i.Value >= 4).OrderByDescending(i => i.Value).ToList(),
            Neutral = items.Where(i => i.Value == 3).ToList(),
            Weaknesses = items.Where(i => i.Value <= 2).OrderBy(i => i.Value).ToList(),
        };
    }

    /// <summary>Notas do questionário situacional por nome de competência; vazio se ele ainda não foi enviado.</summary>
    private async Task<Dictionary<string, int>> GetBehaviorScoresAsync(Guid userId)
    {
        var report = await _competencyReportService.GetMyReportAsync(userId, timezoneOffsetMinutes: 0);
        return report?.Competencies.ToDictionary(c => c.Name, c => c.Score, StringComparer.OrdinalIgnoreCase)
            ?? new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
    }

    private static SoftSkillReportItemResponse BuildItem(
        UserSoftSkillAnswer latest, UserSoftSkillAnswer? previous, Dictionary<string, int> behaviorScores)
    {
        var skill = latest.SoftSkill!;
        var value = latest.SoftSkillOption!.Value;
        var isStrength = value >= 4;
        var texts = SoftSkillReportTexts.SoftSkills.TryGetValue(skill.Name, out var found) ? found : default;

        var item = new SoftSkillReportItemResponse
        {
            SoftSkillId = skill.NavigationId,
            Name = skill.Name,
            Value = value,
            Label = latest.SoftSkillOption.Label,
            PreviousValue = previous?.SoftSkillOption?.Value,
            Summary = isStrength
                ? texts.Strength ?? SoftSkillReportTexts.GenericStrength
                : texts.Problem ?? SoftSkillReportTexts.GenericProblem,
            Tips = isStrength
                ? [texts.StrengthTip ?? SoftSkillReportTexts.GenericStrengthTip]
                : [.. texts.Tips ?? SoftSkillReportTexts.GenericTips],
        };

        if (texts.Competency is not null && behaviorScores.TryGetValue(texts.Competency, out var behaviorScore))
        {
            item.BehaviorScore = behaviorScore;
            var selfScore = (value - 1) * 25; // 1..5 -> 0..100
            if (selfScore - behaviorScore >= BehaviorGapThreshold)
                item.BehaviorGap = $"Você se deu {value}, mas no questionário situacional tirou {behaviorScore}/100 em {texts.Competency}. Tem distância entre como você se vê e como você age.";
            else if (behaviorScore - selfScore >= BehaviorGapThreshold)
                item.BehaviorGap = $"Você se deu {value}, mas no questionário situacional tirou {behaviorScore}/100 em {texts.Competency}. Você é melhor nisso do que acha.";
        }

        return item;
    }

    private static List<string> BuildWarnings(List<SoftSkillReportItemResponse> items)
    {
        var warnings = new List<string>();

        if (items.Count > 1 && items.All(i => i.Value == items[0].Value))
        {
            warnings.Add(items[0].Value switch
            {
                5 => "Tudo 5? Ou você é referência em tudo, ou deu migué na autoavaliação.",
                1 => "Tudo 1? Autocrítica é bom, mas assim é exagero — ninguém é ruim em tudo.",
                _ => $"Nota {items[0].Value} em tudo. Ficar em cima do muro não é autoavaliação: é fugir da resposta.",
            });
        }

        var overestimated = items.Count(i => i.BehaviorScore is not null && (i.Value - 1) * 25 - i.BehaviorScore >= BehaviorGapThreshold);
        if (overestimated >= 2)
            warnings.Add($"Em {overestimated} soft skills você se deu nota bem maior do que o questionário situacional mostra. Vale desconfiar um pouco da própria régua.");

        return warnings;
    }
}
