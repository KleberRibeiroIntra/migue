namespace Migue.Domain.Entities;

/// <summary>Agrupa justificativas parecidas para o relatório (ex: "permissão ao diretório" e "acesso à VPN" são ambos Acessos).</summary>
public record ScoreReasonCategory : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Order { get; set; }

    public ICollection<ScoreReason> ScoreReasons { get; set; } = [];
}
