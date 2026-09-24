using Migue.Domain.AppService.Dtos.Responses;

namespace Migue.Domain.AppService.Services;

public interface ISoftSkillReportService
{
    /// <summary>Análise da última autoavaliação de soft skills do usuário; null se ele nunca respondeu.</summary>
    Task<SoftSkillReportResponse?> GetMyReportAsync(Guid userId);
}
