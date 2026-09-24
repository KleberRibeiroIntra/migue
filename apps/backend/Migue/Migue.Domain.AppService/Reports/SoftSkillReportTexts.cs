namespace Migue.Domain.AppService.Reports;

/// <summary>Textos do relatório de soft skills. Mesmo tom do resto do migué: direto, sem rodeio.</summary>
internal static class SoftSkillReportTexts
{
    /// <summary>
    /// Por soft skill: o que significa estar bem nela, o que significa estar mal, dicas pra subir de nível
    /// e a competência equivalente no questionário situacional (pra confrontar autoimagem com comportamento).
    /// </summary>
    public static readonly Dictionary<string, (string Strength, string StrengthTip, string Problem, string[] Tips, string? Competency)> SoftSkills =
        new(StringComparer.OrdinalIgnoreCase)
        {
            ["Comunicação"] = (
                "Você se vê explicando bem e sendo entendido. Isso é raro — e faz o time andar mais rápido.",
                "Seja quem traduz o técnico pro resto do time: puxe a explicação nas reuniões em que todo mundo sai com cara de dúvida.",
                "O que você fala não chega do jeito que você pensa. E quando a comunicação falha, todo o resto atrasa junto.",
                [
                    "Avise o que travou antes de alguém perguntar — status curto, todo dia.",
                    "Antes de explicar, pergunte o que a pessoa já sabe sobre o assunto.",
                    "Termine com \"o que ficou confuso?\" em vez de \"entendeu?\".",
                ],
                "Comunicação"),
            ["Trabalho em equipe"] = (
                "Você cobre quem tá enrolado sem fazer drama. Esse é o tipo de pessoa que todo time quer.",
                "Use isso pra puxar quem está isolado: ofereça par de programação ou uma revisão rápida.",
                "Você faz a sua parte e para por aí. Time não é soma de tarefas individuais.",
                [
                    "Uma vez por dia, pergunte a alguém do time se precisa de ajuda.",
                    "Olhe o quadro do time, não só os seus cards.",
                    "Quando discordar, argumente e escute — não brigue nem aceite calado.",
                ],
                "Trabalho em Equipe"),
            ["Proatividade"] = (
                "Você levanta a mão antes de pedirem. É assim que se vira referência em vez de executor.",
                "Transforme isso em impacto: escolha um problema recorrente do time e resolva de vez.",
                "Você espera o problema chegar até você. Quem espera ser chamado fica sempre um passo atrás.",
                [
                    "Viu um problema, mesmo que não seja seu? Avise o responsável no mesmo dia.",
                    "Terminou antes do prazo? Pegue uma melhoria pequena em vez de esperar a próxima tarefa.",
                    "Leve uma sugestão concreta por semana para a daily ou a retro.",
                ],
                "Proatividade"),
            ["Escuta ativa"] = (
                "Você ouve o feedback antes de sair fazendo. Isso evita retrabalho — e muita briga.",
                "Use nas conversas difíceis: repita com suas palavras o que ouviu antes de responder.",
                "Você escuta pra responder, não pra entender. O resultado é fazer a coisa certa do jeito errado.",
                [
                    "Nas próximas reuniões, só fale depois de resumir o que o outro disse.",
                    "Recebeu feedback? Faça duas perguntas antes de explicar seu lado.",
                    "Anote o pedido com as palavras de quem pediu, não com as suas.",
                ],
                "Abertura a Feedback"),
            ["Resolução de problemas"] = (
                "Você desenrola. Quando trava, é pra você que o time olha.",
                "Documente como você resolveu os problemas mais cabeludos — isso multiplica seu impacto.",
                "Você resolve no susto ou demora pra achar o caminho. Sintoma resolvido, problema de volta na semana seguinte.",
                [
                    "Antes de mexer em qualquer coisa, escreva em uma frase qual é a causa.",
                    "Quando uma solução falhar, descubra por que falhou antes de tentar outra.",
                    "Divida o problema em partes e ataque a menor primeiro.",
                ],
                "Resolução de Problemas"),
            ["Gestão do tempo"] = (
                "Você entrega no prazo sem virar noite. Previsibilidade é uma das coisas mais valiosas num time.",
                "Ajude o time a estimar: sua noção de prazo é ouro no planejamento.",
                "Os migués aparecem perto do prazo. O problema não é a correria do fim: é o que não foi feito no começo.",
                [
                    "Viu que vai atrasar? Avise no dia em que percebeu, não no dia do prazo.",
                    "Priorize por prazo + impacto + esforço, não pelo que é mais rápido.",
                    "Quebre tarefas grandes em entregas de no máximo um dia.",
                ],
                "Gestão de Tempo"),
        };

    public const string GenericStrength = "Você se vê bem nessa. Aproveite e use isso a favor do time.";
    public const string GenericStrengthTip = "Compartilhe com o time como você faz — o que é natural pra você pode ser o travamento de alguém.";
    public const string GenericProblem = "Você mesmo se deu nota baixa aqui. Reconhecer é o primeiro passo; o segundo é ter um plano.";
    public static readonly string[] GenericTips =
    [
        "Escolha uma situação concreta desta semana pra praticar isso.",
        "Peça feedback específico sobre isso pra alguém em quem você confia.",
    ];

    public static (string Headline, string Detail) Verdict(double average) => average switch
    {
        >= 4.2 => ("Autoconfiança lá em cima.", "Você se vê bem em quase tudo. Ótimo — agora confira se o questionário situacional concorda com você."),
        >= 3.4 => ("Se vê bem, com uns pontos de atenção.", "No geral você se avalia bem, mas tem pelo menos uma soft skill pedindo cuidado."),
        >= 2.6 => ("No morno.", "Nem entrega nem compromete. Morno não é ruim, mas também não é o que te faz ser lembrado."),
        _ => ("Você mesmo reconhece que tá dando migué.", "Nota baixa na própria autoavaliação dói, mas é honesto. Comece pelos pontos fracos abaixo."),
    };
}
