using Migue.Domain.Enums;
using static Migue.Domain.Enums.CompetencyOptionSignal;

namespace Migue.Domain.Data.SeedData;

/// <summary>
/// Gabarito do questionário situacional: para cada pergunta (pelo texto), o peso e o sinal de cada
/// alternativa, na mesma ordem de <see cref="CompetencyQuestionSeedData"/>.
/// Peso 4 = comportamento mais maduro (entende antes de agir, comunica, ajusta); 1 = o mais fraco.
/// </summary>
internal static class CompetencyOptionScoreSeedData
{
    public static readonly Dictionary<string, (int Score, CompetencyOptionSignal Signal)[]> Scores = new()
    {
        // Comunicação
        ["Quando precisa explicar algo técnico para alguém que não domina o assunto, como você costuma agir?"] = [(1, Rigid), (3, None), (3, None), (4, None)],
        ["Quando percebe que alguém não entendeu uma explicação sua, o que costuma fazer?"] = [(1, Rigid), (3, None), (3, None), (4, None)],
        ["Quando discorda de alguém durante uma discussão, como normalmente reage?"] = [(1, Impulsive), (4, None), (3, None), (1, Avoidant)],

        // Resolução de Problemas
        ["Quando surge um problema que você nunca enfrentou antes, o que costuma fazer primeiro?"] = [(2, None), (3, None), (2, None), (4, None)],
        ["Quando uma solução que você tentou não funciona, como costuma reagir?"] = [(1, Impulsive), (4, None), (2, None), (3, None)],
        ["Quando recebe um problema aparentemente urgente, qual costuma ser sua primeira reação?"] = [(1, Impulsive), (3, None), (4, None), (3, None)],

        // Organização
        ["Quando recebe várias tarefas ao mesmo tempo, como costuma organizá-las?"] = [(1, None), (2, None), (4, None), (2, None)],
        ["Como costuma acompanhar aquilo que precisa fazer?"] = [(1, None), (2, None), (4, None), (2, None)],
        ["Quando percebe que sua organização inicial não está funcionando, o que faz?"] = [(1, Rigid), (4, None), (3, None), (3, None)],

        // Proatividade
        ["Você percebe um problema que ainda não está afetando ninguém. O que costuma fazer?"] = [(1, Passive), (3, None), (4, None), (2, None)],
        ["Quando termina uma tarefa antes do prazo, o que normalmente faz?"] = [(1, Passive), (4, None), (3, None), (2, Fatigue)],
        ["Você identifica uma melhoria em um processo que funciona, mas poderia ser melhor. Como costuma agir?"] = [(2, Impulsive), (4, None), (3, None), (1, Rigid)],

        // Adaptabilidade
        ["Quando uma prioridade muda repentinamente, como você costuma reagir?"] = [(1, Rigid), (3, None), (4, None), (3, None)],
        ["Quando precisa trabalhar com uma ferramenta nova, como costuma começar?"] = [(1, Passive), (4, None), (3, None), (2, None)],
        ["Quando um plano que você preparou deixa de fazer sentido, o que costuma fazer?"] = [(1, Rigid), (2, None), (3, None), (4, None)],

        // Trabalho em Equipe
        ["Quando trabalha em uma atividade que depende de outras pessoas, como costuma agir?"] = [(1, Passive), (4, None), (3, None), (3, None)],
        ["Quando percebe que alguém da equipe está com dificuldade, o que costuma fazer?"] = [(1, Passive), (4, None), (3, None), (2, None)],
        ["Quando sua opinião é diferente da maioria da equipe, como costuma agir?"] = [(1, Defensive), (4, None), (2, Avoidant), (3, None)],

        // Pensamento Crítico
        ["Quando recebe uma informação importante, como costuma avaliá-la?"] = [(1, None), (3, None), (4, None), (4, None)],
        ["Quando uma solução parece funcionar muito bem, o que costuma fazer?"] = [(1, None), (3, None), (4, None), (3, None)],
        ["Quando alguém apresenta uma opinião diferente da sua, como costuma reagir?"] = [(1, Defensive), (3, None), (3, None), (4, None)],

        // Gestão de Tempo
        ["Quando possui várias tarefas com prazos diferentes, como costuma decidir o que fazer primeiro?"] = [(1, None), (2, None), (4, None), (3, None)],
        ["Quando percebe que não conseguirá cumprir um prazo, o que costuma fazer?"] = [(1, Isolated), (4, None), (3, None), (3, None)],
        ["Quando possui um período livre durante o trabalho, como costuma utilizá-lo?"] = [(3, None), (3, None), (4, None), (2, Fatigue)],

        // Responsabilidade
        ["Quando comete um erro que afeta uma atividade, como costuma agir?"] = [(1, Isolated), (4, None), (3, None), (3, None)],
        ["Quando assume uma tarefa, o que normalmente considera como sua responsabilidade?"] = [(1, None), (2, None), (3, None), (4, None)],
        ["Quando percebe que não conseguirá cumprir um compromisso assumido, como reage?"] = [(1, Isolated), (3, None), (3, None), (4, None)],

        // Aprendizado
        ["Quando precisa aprender algo novo para realizar uma tarefa, como costuma fazer?"] = [(1, None), (4, None), (3, None), (3, None)],
        ["Depois de cometer um erro, o que normalmente faz?"] = [(1, None), (3, None), (3, None), (4, None)],
        ["Quando aprende uma maneira melhor de realizar uma tarefa, o que costuma fazer?"] = [(2, None), (3, None), (4, None), (3, None)],

        // Abertura a Feedback
        ["Quando recebe um feedback sobre algo que poderia melhorar, como costuma reagir?"] = [(3, None), (3, None), (4, None), (1, Defensive)],
        ["Quando recebe um feedback com o qual não concorda, o que costuma fazer?"] = [(1, Defensive), (4, None), (3, None), (3, None)],
        ["Quando alguém elogia seu trabalho, como costuma reagir?"] = [(2, None), (3, None), (3, None), (4, None)],

        // Inteligência Emocional
        ["Quando está sob pressão, como costuma perceber seu próprio comportamento?"] = [(1, Suppressed), (2, Irritability), (4, None), (3, None)],
        ["Quando alguém reage de maneira agressiva durante uma conversa, como costuma agir?"] = [(1, Impulsive), (3, None), (4, None), (3, None)],
        ["Quando percebe que está frustrado com uma situação, o que costuma fazer?"] = [(1, Suppressed), (3, None), (4, None), (3, None)],

        // Tomada de Decisão
        ["Quando precisa tomar uma decisão importante, o que costuma considerar?"] = [(1, None), (3, None), (2, None), (4, None)],
        ["Quando não possui todas as informações necessárias para decidir, o que costuma fazer?"] = [(1, Passive), (3, None), (4, None), (2, None)],
        ["Quando percebe que tomou uma decisão errada, como costuma agir?"] = [(2, None), (3, None), (3, None), (4, None)],

        // Criatividade
        ["Quando precisa resolver algo para o qual não existe um procedimento definido, como costuma agir?"] = [(3, None), (3, None), (4, None), (2, None)],
        ["Quando recebe uma tarefa que poderia ser feita de várias maneiras, como escolhe?"] = [(1, Rigid), (2, None), (4, None), (3, None)],
        ["Quando identifica uma oportunidade de fazer algo de uma maneira diferente, o que costuma fazer?"] = [(3, None), (3, None), (4, None), (1, Avoidant)],

        // Colaboração
        ["Quando precisa realizar uma tarefa que envolve conhecimento de outra pessoa, como costuma agir?"] = [(1, Isolated), (3, None), (4, None), (3, None)],
        ["Quando possui conhecimento que pode ajudar outra pessoa, o que costuma fazer?"] = [(1, Passive), (3, None), (3, None), (4, None)],
        ["Quando uma atividade depende da contribuição de várias pessoas, como costuma participar?"] = [(1, Passive), (3, None), (3, None), (4, None)],

        // Liderança
        ["Quando percebe que uma equipe está sem direção clara, o que costuma fazer?"] = [(1, Passive), (2, None), (4, None), (3, None)],
        ["Quando precisa coordenar uma atividade com outras pessoas, como costuma agir?"] = [(1, None), (4, None), (2, None), (3, None)],
        ["Quando uma decisão da equipe não produz o resultado esperado, como costuma agir?"] = [(3, None), (3, None), (2, None), (4, None)],

        // Negociação
        ["Quando precisa chegar a um acordo com alguém que possui uma opinião diferente, o que costuma fazer?"] = [(1, Defensive), (4, None), (2, None), (3, None)],
        ["Quando uma pessoa solicita algo que você não consegue entregar, como costuma responder?"] = [(1, None), (3, None), (3, None), (4, None)],
        ["Quando precisa priorizar entre demandas conflitantes, como costuma agir?"] = [(1, None), (4, None), (3, None), (2, None)],

        // Empatia
        ["Quando percebe que alguém está tendo dificuldade, como costuma agir?"] = [(1, Passive), (3, None), (4, None), (3, None)],
        ["Quando alguém apresenta uma opinião que você considera equivocada, como costuma responder?"] = [(1, Defensive), (4, None), (2, None), (3, None)],
        ["Quando uma pessoa reage de maneira diferente do que você esperava, o que costuma fazer?"] = [(3, None), (3, None), (1, Avoidant), (4, None)],

        // Foco em Resultados
        ["Quando recebe uma tarefa, como costuma definir se ela foi bem executada?"] = [(1, None), (2, None), (4, None), (3, None)],
        ["Quando percebe que uma tarefa está consumindo mais tempo do que deveria, o que costuma fazer?"] = [(1, Rigid), (3, None), (4, None), (2, None)],
        ["Quando precisa escolher entre entregar rapidamente e entregar com mais qualidade, como costuma decidir?"] = [(1, Impulsive), (2, None), (4, None), (3, None)],

        // Planejamento
        ["Quando começa um projeto novo, qual costuma ser sua primeira preocupação?"] = [(4, None), (2, None), (1, None), (3, None)],
        ["Quando possui uma tarefa grande e complexa, como costuma começar?"] = [(1, Impulsive), (3, None), (4, None), (2, None)],
        ["Quando percebe que um planejamento está atrasado, o que costuma fazer?"] = [(1, Rigid), (2, None), (3, None), (4, None)],

        // Resiliência
        ["Quando uma tentativa sua não produz o resultado esperado, como costuma reagir?"] = [(1, Rigid), (4, None), (3, None), (2, None)],
        ["Quando recebe várias demandas difíceis ao mesmo tempo, como costuma lidar?"] = [(2, None), (4, None), (3, None), (3, None)],
        ["Quando passa por uma situação profissional frustrante, o que costuma fazer depois?"] = [(1, Suppressed), (3, None), (3, None), (4, None)],

        // Autonomia
        ["Quando recebe uma tarefa com poucas instruções, como costuma começar?"] = [(3, None), (2, None), (4, None), (3, None)],
        ["Quando encontra uma dificuldade durante uma tarefa, o que costuma fazer antes de pedir ajuda?"] = [(2, Isolated), (4, None), (3, None), (1, Passive)],
        ["Quando recebe liberdade para decidir como realizar uma tarefa, como costuma agir?"] = [(1, Rigid), (3, None), (4, None), (2, None)],

        // Atenção aos Detalhes
        ["Quando termina uma tarefa importante, o que costuma fazer antes de entregá-la?"] = [(1, Impulsive), (2, None), (3, None), (4, None)],
        ["Quando encontra uma pequena inconsistência em um trabalho, como costuma agir?"] = [(3, None), (2, None), (1, Avoidant), (4, None)],
        ["Quando trabalha com informações importantes, como costuma evitar erros?"] = [(1, None), (3, None), (4, None), (3, None)],

        // Evolução Contínua
        ["Quando percebe que existe uma maneira melhor de realizar uma atividade que você já domina, o que costuma fazer?"] = [(1, Rigid), (3, None), (4, None), (3, None)],
        ["Quando olha para um trabalho realizado anteriormente, o que costuma procurar?"] = [(1, None), (3, None), (3, None), (4, None)],
        ["Quando percebe uma evolução em determinada habilidade sua, o que costuma fazer?"] = [(1, None), (4, None), (3, None), (3, None)],
    };
}
