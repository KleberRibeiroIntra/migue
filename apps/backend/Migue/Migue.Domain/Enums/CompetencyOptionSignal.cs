namespace Migue.Domain.Enums;

/// <summary>Padrão de comportamento que uma alternativa revela. Usado no relatório para achar padrões e sinais de pressão.</summary>
public enum CompetencyOptionSignal
{
    None,
    /// <summary>Age ou reage na hora, sem avaliar.</summary>
    Impulsive,
    /// <summary>Defende a própria posição / resiste a crítica.</summary>
    Defensive,
    /// <summary>Foge do confronto ou empurra para depois.</summary>
    Avoidant,
    /// <summary>Espera alguém pedir, mandar ou ensinar.</summary>
    Passive,
    /// <summary>Mantém o que já conhece mesmo quando não funciona.</summary>
    Rigid,
    /// <summary>Resolve sozinho e não comunica.</summary>
    Isolated,
    /// <summary>Ignora o próprio estado emocional e "segue normalmente".</summary>
    Suppressed,
    /// <summary>Busca descanso quando sobra tempo.</summary>
    Fatigue,
    /// <summary>Reconhece que fica impaciente sob pressão.</summary>
    Irritability
}
