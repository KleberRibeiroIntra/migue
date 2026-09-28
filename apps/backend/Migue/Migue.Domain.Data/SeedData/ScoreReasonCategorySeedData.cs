namespace Migue.Domain.Data.SeedData;

/// <summary>
/// Categorias iniciais, com ids fixos porque a migration AddScoreReasonCategoryTable usa esses mesmos ids
/// pra converter o antigo enum ScoreReasonCategory (LegacyValue) nas justificativas que já existiam.
/// </summary>
internal static class ScoreReasonCategorySeedData
{
    public static readonly (Guid Id, int LegacyValue, string Name, string Description)[] Categories =
    [
        (Guid.Parse("189499a5-8871-42a7-a7c4-bffdf087dd5b"), 1, "Acessos", "Acessos, permissões e credenciais."),
        (Guid.Parse("074e9de5-4528-4752-bc2c-f9794d5e66ad"), 2, "Reuniões", "Reunião demais (ou de menos)."),
        (Guid.Parse("34b6d061-73db-46bf-a90c-6be8a5d2b24e"), 3, "Conhecimento técnico", "Entendimento da arquitetura, do código ou da tecnologia."),
        (Guid.Parse("9e451985-b4f9-46ed-8823-66aff45ff269"), 4, "Requisitos", "Clareza e estabilidade do que foi pedido."),
        (Guid.Parse("079e1363-5934-4ff3-8c22-4a07d31673a6"), 5, "Dependências", "Espera por outra pessoa ou time."),
        (Guid.Parse("fa17409c-7036-4a94-bf15-b8daaed95b6d"), 6, "Ambiente", "Ambiente, infraestrutura e ferramentas."),
        (Guid.Parse("7d2eb692-eb70-4221-8c07-2584dfeb960a"), 7, "Interrupções", "Demanda paralela e gente chamando toda hora."),
        (Guid.Parse("3af902dd-9997-4bfd-bc86-feb3449df976"), 8, "Planejamento", "Estimativa e quebra da tarefa."),
        (Guid.Parse("45dd7498-06f9-4a92-acd5-1addf50f2130"), 9, "Colaboração", "Como o time ajudou (ou não)."),
        (Guid.Parse("6650bb26-3a33-40e6-8aa7-76b82f7c91cd"), 10, "Foco", "Tempo pra fazer sem ninguém atrapalhar."),
        (Guid.Parse("7755b345-9fac-48f9-9541-533cc193fc54"), 0, "Outros", "O que não se encaixa em nenhuma das outras."),
    ];

    public static Guid IdOf(string name) => Categories.Single(c => c.Name == name).Id;
}
