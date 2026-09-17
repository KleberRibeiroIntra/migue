using Microsoft.EntityFrameworkCore;
using Migue.Domain.Entities;

namespace Migue.Domain.Data;

public static class DbSeeder
{
    private static readonly string[] Themes =
    [
        "Portal do Cliente", "App Mobile de Vendas", "Dashboard Financeiro", "Integração de Pagamentos",
        "Redesign do Site Institucional", "Automação de Testes", "Pipeline de Deploy", "Sistema de Estoque",
        "CRM Interno", "Migração para Cloud", "Chatbot de Suporte", "Portal de RH",
        "App de Delivery", "Sistema de Agendamento", "Plataforma de Cursos", "Marketplace B2B",
        "Programa de Fidelidade", "Sistema de Notas Fiscais", "Integração com ERP", "Dashboard de BI",
        "Controle de Ponto", "Sistema de Chamados", "Portal de Fornecedores", "Sistema de Reservas",
        "Gestão de Frotas"
    ];

    public static async Task SeedProjectsAsync(MigueDbContext context)
    {
        if (await context.Projects.AnyAsync())
            return;

        var now = DateTime.UtcNow;
        var projects = new List<Project>();

        foreach (var theme in Themes)
        {
            foreach (var phase in new[] { "Fase 1", "Fase 2" })
            {
                var index = projects.Count;
                projects.Add(new Project
                {
                    NavigationId = Guid.NewGuid(),
                    Name = $"{theme} - {phase}",
                    Description = $"Descrição do projeto \"{theme}\" ({phase}).",
                    CreatedAt = now.AddDays(-(Themes.Length * 2 - index)),
                    CreatedBy = Guid.Empty,
                    Active = index % 7 != 0
                });
            }
        }

        await context.Projects.AddRangeAsync(projects);
        await context.SaveChangesAsync();
    }
}
