using Migue.Domain.Enums;

namespace Migue.Domain.AppService.Reports;

/// <summary>Textos do relatório do mapa de competências. Diretos de propósito: o objetivo é mostrar o que melhorar, sem rodeio.</summary>
internal static class CompetencyReportTexts
{
    public static readonly Dictionary<CompetencyOptionSignal, (string Label, string Meaning)> Signals = new()
    {
        [CompetencyOptionSignal.Impulsive] = ("Age antes de pensar",
            "Você reage na hora. Parece agilidade, mas na prática é apagar incêndio com gasolina: age antes de entender o problema."),
        [CompetencyOptionSignal.Defensive] = ("Na defensiva",
            "Quando discordam de você, seu primeiro reflexo é se defender. Quem se defende não escuta — e quem não escuta não aprende."),
        [CompetencyOptionSignal.Avoidant] = ("Foge da raia",
            "Você empurra conflito e decisão pra depois. O problema não some: só cresce enquanto você não olha."),
        [CompetencyOptionSignal.Passive] = ("Espera alguém mandar",
            "Você aguarda pedirem, ensinarem ou assumirem. Isso é esperar o problema virar responsabilidade de outra pessoa."),
        [CompetencyOptionSignal.Rigid] = ("Cabeça dura",
            "Você insiste no que já conhece mesmo quando não está funcionando. Repetir o mesmo e esperar resultado diferente não é persistência."),
        [CompetencyOptionSignal.Isolated] = ("Resolve calado",
            "Você tenta resolver sozinho e só avisa depois. Quando dá errado, a equipe descobre tarde demais pra ajudar."),
        [CompetencyOptionSignal.Suppressed] = ("Engole e segue",
            "Sob pressão ou frustração você \"continua normalmente\". Não continua: acumula. Uma hora a conta chega."),
        [CompetencyOptionSignal.Fatigue] = ("Bateria baixa",
            "Quando sobra tempo, sua escolha é descansar. Não é pecado — mas, repetido, é sinal de cansaço acumulado."),
        [CompetencyOptionSignal.Irritability] = ("Pavio curto",
            "Você mesmo admitiu que fica impaciente sob pressão. Ponto pela honestidade; agora é tratar isso antes que alguém pague o pato."),
    };

    /// <summary>Sinais que, somados, indicam pressão no momento em que o questionário foi respondido.</summary>
    public static readonly HashSet<CompetencyOptionSignal> PressureSignals =
    [
        CompetencyOptionSignal.Impulsive,
        CompetencyOptionSignal.Defensive,
        CompetencyOptionSignal.Irritability,
        CompetencyOptionSignal.Suppressed,
        CompetencyOptionSignal.Isolated,
        CompetencyOptionSignal.Fatigue,
    ];

    /// <summary>Competências cujas perguntas medem diretamente como a pessoa lida com pressão.</summary>
    public static readonly HashSet<string> PressureCompetencies = ["Inteligência Emocional", "Resiliência"];

    public static readonly Dictionary<string, (string Problem, string[] Actions)> Competencies = new()
    {
        ["Comunicação"] = ("Você fala do seu jeito e espera que o outro entenda. Se não entendeu, o problema é da explicação, não da pessoa.",
            ["Antes de explicar, pergunte o que a pessoa já sabe.", "Troque jargão por exemplo concreto.", "Termine perguntando o que ficou confuso — não \"entendeu?\"."]),
        ["Resolução de Problemas"] = ("Você parte pra solução antes de achar a causa. Resolve o sintoma e o problema volta.",
            ["Escreva em uma frase qual é a causa antes de mexer em qualquer coisa.", "Quando uma solução falhar, descubra por que falhou antes de tentar outra."]),
        ["Organização"] = ("Sua organização depende de memória e de ordem de chegada. Funciona até o dia em que não funciona.",
            ["Coloque tudo numa lista ou ferramenta — nada fica só na cabeça.", "Ordene por prioridade e prazo, não por quem pediu primeiro."]),
        ["Proatividade"] = ("Você espera o problema chegar até você. Quem espera ser chamado vira executor, não referência.",
            ["Viu um problema? Avise o responsável no mesmo dia.", "Terminou antes? Pegue uma melhoria pequena em vez de esperar a próxima tarefa."]),
        ["Adaptabilidade"] = ("Mudança te trava. Você se agarra ao plano original enquanto o cenário já mudou.",
            ["Quando a prioridade mudar, pergunte o motivo e reorganize em 15 minutos — não em 2 dias.", "Ferramenta nova: abra a documentação antes de esperar alguém te ensinar."]),
        ["Trabalho em Equipe"] = ("Você faz a sua parte e considera o trabalho feito. Time não é soma de partes isoladas.",
            ["Pergunte a quem está travado se precisa de ajuda — não espere pedirem.", "Discordou da maioria? Argumente e escute; não brigue nem aceite calado."]),
        ["Pensamento Crítico"] = ("Você aceita informação e solução sem questionar. Funcionou uma vez não quer dizer que está certo.",
            ["Antes de repassar uma informação, confira a fonte.", "Quando algo \"funciona muito bem\", procure onde ele quebra."]),
        ["Gestão de Tempo"] = ("Você escolhe o que fazer pelo mais fácil ou mais urgente, e quando o prazo aperta, acelera calado.",
            ["Priorize por prazo + impacto + esforço, não pelo mais rápido.", "Viu que vai atrasar? Avise no dia em que percebeu, não no dia do prazo."]),
        ["Responsabilidade"] = ("Você tenta consertar o erro antes de contar. Quando não dá tempo, todo mundo descobre junto — da pior forma.",
            ["Errou? Comunique primeiro, corrija depois.", "Considere a tarefa pronta quando o resultado funciona, não quando você entregou."]),
        ["Aprendizado"] = ("Você corrige e segue sem entender o que aconteceu. Aprende a mesma lição várias vezes.",
            ["Depois de cada erro, anote em uma linha a causa e como evitar.", "Aprendeu um jeito melhor? Compartilhe com o time."]),
        ["Abertura a Feedback"] = ("Crítica te pega. Seu reflexo é explicar seu lado antes de entender o que a pessoa viu.",
            ["No próximo feedback, só faça perguntas nos primeiros 5 minutos.", "Peça um exemplo concreto antes de concordar ou discordar."]),
        ["Inteligência Emocional"] = ("Sob pressão você reage ou engole. Nenhum dos dois resolve: um explode na hora, o outro depois.",
            ["Percebeu que está irritado? Pause 5 minutos antes de responder.", "Nomeie o que está causando a pressão — em voz alta ou por escrito."]),
        ["Tomada de Decisão"] = ("Você decide pela própria experiência ou espera ter 100% das informações. Um vira achismo, o outro vira paralisia.",
            ["Para decisões importantes, liste impacto e consequência antes de escolher.", "Defina um prazo pra decidir com o que tiver até lá."]),
        ["Criatividade"] = ("Você vai no jeito que já conhece ou deixa a ideia nova pra depois. \"Depois\" costuma ser nunca.",
            ["Para cada tarefa com mais de um caminho, compare pelo menos duas opções.", "Teve uma ideia? Teste pequeno esta semana."]),
        ["Colaboração"] = ("Você tenta sozinho primeiro e espera perguntarem pra compartilhar o que sabe.",
            ["Precisa do conhecimento de alguém? Peça logo, e aprenda com a pessoa.", "Ofereça ajuda sem esperar pedirem."]),
        ["Liderança"] = ("Quando falta direção, você espera alguém assumir. Liderança não é cargo, é iniciativa.",
            ["Time perdido? Proponha as próximas três ações.", "Ao coordenar, alinhe objetivo antes de distribuir tarefa."]),
        ["Negociação"] = ("Você defende sua posição ou diz \"não dá\". Negociar é descobrir o que o outro realmente precisa.",
            ["Antes de dizer não, pergunte qual é a necessidade principal.", "Ofereça alternativa de prazo ou escopo em vez de uma recusa seca."]),
        ["Empatia"] = ("Você espera a pessoa pedir ajuda ou explica por que ela está errada antes de entender.",
            ["Percebeu alguém mal? Pergunte se está tudo bem.", "Antes de discordar, pergunte o que levou a pessoa àquela opinião."]),
        ["Foco em Resultados"] = ("Para você, pronto é quando terminou. Pronto é quando resolveu a necessidade de quem pediu.",
            ["Antes de começar, confirme qual é o resultado esperado.", "Tarefa demorando demais? Pare e questione se o caminho é esse."]),
        ["Planejamento"] = ("Você começa pela primeira coisa que dá pra fazer. Sem enxergar o todo, o atraso é certo.",
            ["Antes de executar, entenda o objetivo e liste riscos e dependências.", "Plano atrasou? Ache a causa antes de mexer nos prazos."]),
        ["Resiliência"] = ("Quando algo dá errado você tenta de novo do mesmo jeito ou segue como se nada fosse.",
            ["Depois de uma frustração, anote o que faria diferente.", "Com várias demandas difíceis, priorize antes de sair resolvendo."]),
        ["Autonomia"] = ("Ou você vai sozinho sem alinhar, ou pede ajuda cedo demais. Os dois custam caro.",
            ["Com poucas instruções, pergunte a expectativa antes de começar.", "Travou? Pesquise por 30 minutos antes de pedir ajuda — e aí peça."]),
        ["Atenção aos Detalhes"] = ("Você entrega assim que termina e confia na própria atenção. É assim que erro bobo chega no cliente.",
            ["Revise tudo que for importante antes de entregar — com checklist.", "Achou uma inconsistência? Descubra por que aconteceu."]),
        ["Evolução Contínua"] = ("Você continua fazendo do jeito de sempre. O que te trouxe até aqui não vai te levar adiante.",
            ["Ao revisar um trabalho antigo, pergunte o que faria diferente hoje.", "Escolha um desafio novo por mês para a habilidade que você já domina."]),
    };

    public static string WeakAnswerReason(CompetencyOptionSignal signal, int score) =>
        Signals.TryGetValue(signal, out var text)
            ? text.Meaning
            : score == 1
                ? "Essa foi a alternativa mais fraca da pergunta: resolve o imediato e deixa o problema de verdade pra depois."
                : "Não é errado, mas é raso: tem uma forma mais madura de agir nessa situação.";

    public static (string Headline, string Detail) Verdict(int overallScore) => overallScore switch
    {
        >= 80 => ("Entrega de verdade. Pouco migué.", "Suas respostas mostram maturidade na maior parte das situações. O que sobrou pra melhorar é ajuste fino."),
        >= 65 => ("Entrega, mas dá umas escorregadas.", "Você manda bem em muita coisa, mas tem pontos claros onde o reflexo ainda é o mais fácil, não o melhor."),
        >= 50 => ("Metade entrega, metade migué.", "Em boa parte das situações você escolhe o caminho mais cômodo. Dá pra melhorar rápido focando nos pontos abaixo."),
        _ => ("Tá dando migué em muita coisa.", "Na maioria das situações sua reação é a mais fraca das opções. Sem drama: comece pelos três primeiros pontos abaixo."),
    };

    public static string CompetencyLevel(int score) => score switch
    {
        >= 80 => "Manda bem",
        >= 60 => "Ok",
        >= 40 => "Precisa melhorar",
        _ => "Crítico",
    };

    public static (string Label, string Headline, string Detail) Mood(int level) => level switch
    {
        0 => ("Tranquilo", "Você respondeu de cabeça fria.",
            "Não apareceram sinais fortes de pressão. As notas abaixo são um retrato confiável de como você age."),
        1 => ("Tenso", "Tinha alguma tensão no ar.",
            "Apareceram alguns sinais de pressão. Nada alarmante, mas repare se os pontos fracos batem com os dias corridos."),
        2 => ("Estressado", "Você estava estressado quando respondeu isso.",
            "As respostas têm vários reflexos de quem está sob pressão. As notas podem estar piores do que num dia normal — mas mostram exatamente como você age quando o bicho pega, que é quando mais importa."),
        _ => ("No limite", "Você respondeu no limite. Sério.",
            "O padrão das respostas é de quem está sobrecarregado. Antes de trabalhar qualquer competência, olhe pra sua carga e pro seu descanso."),
    };
}
