using Migue.Domain.AppService.Dtos.Responses;

namespace Migue.Domain.AppService.Services;

public interface ICompetencyReportService
{
    /// <summary>
    /// Relatório do último questionário de comportamento enviado pelo usuário; null se ele nunca enviou.
    /// <paramref name="timezoneOffsetMinutes"/> segue o Date.getTimezoneOffset() do navegador (UTC - local, em minutos).
    /// </summary>
    Task<CompetencyReportResponse?> GetMyReportAsync(Guid userId, int timezoneOffsetMinutes);
}
