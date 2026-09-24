using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Migue.Domain.Data.SeedData;
using Migue.Domain.Entities;
using Migue.Domain.Enums;
using Migue.Domain.Security;

namespace Migue.Domain.Data;

public static class DbSeeder
{
    private static readonly string[] CompetencyNames =
    [
        "Comunicação",
        "Resolução de Problemas",
        "Organização",
        "Proatividade",
        "Adaptabilidade",
        "Trabalho em Equipe",
        "Pensamento Crítico",
        "Gestão de Tempo",
        "Responsabilidade",
        "Aprendizado",
        "Abertura a Feedback",
        "Inteligência Emocional",
        "Tomada de Decisão",
        "Criatividade",
        "Colaboração",
        "Liderança",
        "Negociação",
        "Empatia",
        "Foco em Resultados",
        "Planejamento",
        "Resiliência",
        "Autonomia",
        "Atenção aos Detalhes",
        "Evolução Contínua",
    ];

    private static readonly (string Name, string Note)[] SoftSkills =
    [
        ("Comunicação", "Manda bem explicando o que travou antes de alguém perguntar."),
        ("Trabalho em equipe", "Sempre cobre quem tá enrolado, sem drama."),
        ("Proatividade", "Levanta a mão antes de pedirem."),
        ("Escuta ativa", "Ouve o feedback antes de sair codando."),
        ("Resolução de problemas", "Desenrola rápido, às vezes no susto."),
        ("Gestão do tempo", "Ainda dá uns migués perto do prazo."),
    ];

    private static readonly (int Value, string Label)[] SoftSkillOptionLevels =
    [
        (1, "Precisa desenvolver"),
        (2, "Em desenvolvimento"),
        (3, "Atende expectativas"),
        (4, "Supera expectativas"),
        (5, "Referência"),
    ];

    private static readonly (string Description, ScoreReasonCategory Category, ScoreReasonSentiment Sentiment, bool RequiresComment)[] ScoreReasons =
    [
        ("Demora na liberação de acessos ou permissões", ScoreReasonCategory.Access, ScoreReasonSentiment.Negative, false),
        ("Excesso de reuniões", ScoreReasonCategory.Meetings, ScoreReasonSentiment.Negative, false),
        ("Dificuldade de entender a arquitetura", ScoreReasonCategory.TechnicalKnowledge, ScoreReasonSentiment.Negative, false),
        ("Tecnologia nova ou pouco conhecida", ScoreReasonCategory.TechnicalKnowledge, ScoreReasonSentiment.Negative, false),
        ("Requisitos pouco claros", ScoreReasonCategory.Requirements, ScoreReasonSentiment.Negative, false),
        ("Mudança de escopo durante a tarefa", ScoreReasonCategory.Requirements, ScoreReasonSentiment.Negative, false),
        ("Aguardando outra pessoa ou time", ScoreReasonCategory.Dependencies, ScoreReasonSentiment.Negative, false),
        ("Problemas de ambiente ou infraestrutura", ScoreReasonCategory.Environment, ScoreReasonSentiment.Negative, false),
        ("Interrupções e demandas paralelas", ScoreReasonCategory.Interruptions, ScoreReasonSentiment.Negative, false),
        ("Tarefa maior do que o estimado", ScoreReasonCategory.Planning, ScoreReasonSentiment.Negative, false),
        ("Outro", ScoreReasonCategory.Other, ScoreReasonSentiment.Negative, true),

        ("Requisitos claros", ScoreReasonCategory.Requirements, ScoreReasonSentiment.Positive, false),
        ("Boa colaboração do time", ScoreReasonCategory.Collaboration, ScoreReasonSentiment.Positive, false),
        ("Tempo de foco sem interrupções", ScoreReasonCategory.Focus, ScoreReasonSentiment.Positive, false),
        ("Domínio da tecnologia", ScoreReasonCategory.TechnicalKnowledge, ScoreReasonSentiment.Positive, false),
        ("Acessos e ambiente prontos", ScoreReasonCategory.Environment, ScoreReasonSentiment.Positive, false),
        ("Estimativa acertada", ScoreReasonCategory.Planning, ScoreReasonSentiment.Positive, false),
        ("Outro", ScoreReasonCategory.Other, ScoreReasonSentiment.Positive, true),
    ];

    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<MigueDbContext>();

        await SeedUsersAsync(context);
        await SeedCompetenciesAsync(context);
        await SeedSoftSkillsAsync(context);
        await SeedSoftSkillOptionsAsync(context);
        await SeedCompetencyQuestionsAsync(context);
        await SeedCompetencyOptionScoresAsync(context);
        await SeedScoreReasonsAsync(context);
    }

    public static async Task SeedScoreReasonsAsync(MigueDbContext context)
    {
        if (await context.Set<ScoreReason>().AnyAsync())
            return;

        var now = DateTime.UtcNow;
        var reasons = ScoreReasons.Select((reason, index) => new ScoreReason
        {
            NavigationId = Guid.NewGuid(),
            Description = reason.Description,
            Category = reason.Category,
            Sentiment = reason.Sentiment,
            RequiresComment = reason.RequiresComment,
            Order = index + 1,
            CreatedAt = now,
            CreatedBy = Guid.Empty,
            Active = true
        }).ToList();

        await context.Set<ScoreReason>().AddRangeAsync(reasons);
        await context.SaveChangesAsync();
    }

    /// <summary>Aplica o gabarito (peso + sinal) nas alternativas que ainda não têm, casando pelo texto da pergunta e ordem da opção.</summary>
    public static async Task SeedCompetencyOptionScoresAsync(MigueDbContext context)
    {
        var questions = await context.Set<CompetencyQuestion>()
            .Include(q => q.Options)
            .Where(q => q.Options.Any(o => o.Score == 0))
            .ToListAsync();

        foreach (var question in questions)
        {
            if (!CompetencyOptionScoreSeedData.Scores.TryGetValue(question.Text, out var scores))
                continue;

            foreach (var option in question.Options.Where(o => o.Score == 0 && o.Order >= 1 && o.Order <= scores.Length))
            {
                (option.Score, option.Signal) = scores[option.Order - 1];
            }
        }

        await context.SaveChangesAsync();
    }

    public static async Task SeedCompetenciesAsync(MigueDbContext context)
    {
        if (await context.Set<Competency>().AnyAsync())
            return;

        var now = DateTime.UtcNow;
        var competencies = CompetencyNames.Select((name, index) => new Competency
        {
            NavigationId = Guid.NewGuid(),
            Name = name,
            Order = index + 1,
            CreatedAt = now,
            CreatedBy = Guid.Empty,
            Active = true
        }).ToList();

        await context.Set<Competency>().AddRangeAsync(competencies);
        await context.SaveChangesAsync();
    }

    public static async Task SeedSoftSkillsAsync(MigueDbContext context)
    {
        if (await context.Set<SoftSkill>().AnyAsync())
            return;

        var now = DateTime.UtcNow;
        var softSkills = SoftSkills.Select((skill, index) => new SoftSkill
        {
            NavigationId = Guid.NewGuid(),
            Name = skill.Name,
            Note = skill.Note,
            Order = index + 1,
            CreatedAt = now,
            CreatedBy = Guid.Empty,
            Active = true
        }).ToList();

        await context.Set<SoftSkill>().AddRangeAsync(softSkills);
        await context.SaveChangesAsync();
    }

    public static async Task SeedSoftSkillOptionsAsync(MigueDbContext context)
    {
        if (await context.Set<SoftSkillOption>().AnyAsync())
            return;

        var softSkillIds = await context.Set<SoftSkill>()
            .Select(s => s.NavigationId)
            .ToListAsync();

        var now = DateTime.UtcNow;
        var options = new List<SoftSkillOption>();

        foreach (var softSkillId in softSkillIds)
        {
            options.AddRange(SoftSkillOptionLevels.Select((level, index) => new SoftSkillOption
            {
                NavigationId = Guid.NewGuid(),
                SoftSkillId = softSkillId,
                Value = level.Value,
                Label = level.Label,
                Order = index + 1,
                CreatedAt = now,
                CreatedBy = Guid.Empty,
                Active = true
            }));
        }

        await context.Set<SoftSkillOption>().AddRangeAsync(options);
        await context.SaveChangesAsync();
    }

    public static async Task SeedCompetencyQuestionsAsync(MigueDbContext context)
    {
        if (await context.Set<CompetencyQuestion>().AnyAsync())
            return;

        var competencyIdsByName = await context.Set<Competency>()
            .ToDictionaryAsync(c => c.Name, c => c.NavigationId);

        var now = DateTime.UtcNow;
        var questions = new List<CompetencyQuestion>();
        var options = new List<CompetencyQuestionOption>();
        var questionOrderByCompetency = new Dictionary<string, int>();

        foreach (var (competencyName, text, optionTexts) in CompetencyQuestionSeedData.Questions)
        {
            if (!competencyIdsByName.TryGetValue(competencyName, out var competencyId))
                continue;

            var order = questionOrderByCompetency.GetValueOrDefault(competencyName) + 1;
            questionOrderByCompetency[competencyName] = order;

            var question = new CompetencyQuestion
            {
                NavigationId = Guid.NewGuid(),
                CompetencyId = competencyId,
                Text = text,
                Order = order,
                CreatedAt = now,
                CreatedBy = Guid.Empty,
                Active = true
            };
            questions.Add(question);

            for (var i = 0; i < optionTexts.Length; i++)
            {
                options.Add(new CompetencyQuestionOption
                {
                    NavigationId = Guid.NewGuid(),
                    CompetencyQuestionId = question.NavigationId,
                    Text = optionTexts[i],
                    Order = i + 1,
                    CreatedAt = now,
                    CreatedBy = Guid.Empty,
                    Active = true
                });
            }
        }

        await context.Set<CompetencyQuestion>().AddRangeAsync(questions);
        await context.Set<CompetencyQuestionOption>().AddRangeAsync(options);
        await context.SaveChangesAsync();
    }

    public static async Task SeedUsersAsync(MigueDbContext context)
    {
        if (await context.Set<User>().AnyAsync(u => u.Email == "kleber.ribeiro@intra.com.br"))
            return;

        var user = new User
        {
            NavigationId = Guid.NewGuid(),
            Name = "Kleber",
            Email = "kleber.ribeiro@intra.com.br",
            PasswordHash = PasswordHasher.Hash("123456"),
            CreatedAt = DateTime.UtcNow,
            CreatedBy = Guid.Empty,
            Active = true
        };

        await context.Set<User>().AddAsync(user);
        await context.SaveChangesAsync();
    }
}
