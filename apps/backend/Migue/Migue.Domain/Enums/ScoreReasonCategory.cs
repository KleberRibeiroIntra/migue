namespace Migue.Domain.Enums;

/// <summary>Agrupa justificativas parecidas para o relatório (ex: "permissão ao diretório" e "acesso à VPN" são ambos Access).</summary>
public enum ScoreReasonCategory
{
    Other,
    /// <summary>Acessos, permissões e credenciais.</summary>
    Access,
    Meetings,
    /// <summary>Entendimento da arquitetura, do código ou da tecnologia.</summary>
    TechnicalKnowledge,
    /// <summary>Clareza e estabilidade do que foi pedido.</summary>
    Requirements,
    /// <summary>Espera por outra pessoa ou time.</summary>
    Dependencies,
    /// <summary>Ambiente, infraestrutura e ferramentas.</summary>
    Environment,
    Interruptions,
    /// <summary>Estimativa e quebra da tarefa.</summary>
    Planning,
    Collaboration,
    Focus
}
