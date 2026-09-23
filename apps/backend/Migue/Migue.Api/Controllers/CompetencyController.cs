using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Migue.Api.Extensions;
using Migue.Domain;
using Migue.Domain.AppService.Dtos.QueryRequests;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.AppService.Services;

namespace Migue.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class CompetencyController : ControllerBase
{
    private readonly ICompetencyService _competencyService;
    private readonly ICompetencyAssessmentService _assessmentService;
    private readonly ICompetencyReportService _reportService;

    public CompetencyController(ICompetencyService competencyService, ICompetencyAssessmentService assessmentService,
        ICompetencyReportService reportService)
    {
        _competencyService = competencyService;
        _assessmentService = assessmentService;
        _reportService = reportService;
    }

    [HttpGet("paged")]
    public async Task<ActionResult<DynamicQueryResult<CompetencyResponse>>> GetPaged([FromQuery] CompetencyQueryRequest query)
    {
        var result = await _competencyService.GetPagedAsync(query);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<CompetencyResponse>> GetById(Guid id)
    {
        var competency = await _competencyService.GetByIdAsync(id);
        return competency is null ? NotFound() : Ok(competency);
    }

    [HttpPost]
    public async Task<ActionResult<CompetencyResponse>> Create(CompetencyRequest request)
    {
        var created = await _competencyService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<CompetencyResponse>> Update(Guid id, CompetencyRequest request)
    {
        var updated = await _competencyService.UpdateAsync(id, request);
        return updated is null ? NotFound() : Ok(updated);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _competencyService.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }

    /// <summary>Autoavaliação atual do usuário: o rascunho em andamento ou, se não houver, o último envio. 204 se nunca respondeu.</summary>
    [Authorize]
    [HttpGet("assessment/me")]
    public async Task<ActionResult<CompetencyAssessmentResponse>> GetMyAssessment()
    {
        var assessment = await _assessmentService.GetCurrentAsync(User.GetUserId());
        return assessment is null ? NoContent() : Ok(assessment);
    }

    /// <summary>Salva automaticamente a resposta de uma pergunta no rascunho (cria o rascunho se preciso).</summary>
    [Authorize]
    [HttpPut("assessment/me/answers")]
    public async Task<ActionResult<CompetencyAssessmentResponse>> SaveMyAnswer(CompetencyAnswerRequest request)
    {
        var assessment = await _assessmentService.SaveAnswerAsync(User.GetUserId(), request);
        return Ok(assessment);
    }

    /// <summary>Envia o rascunho, mudando o status para Submitted.</summary>
    [Authorize]
    [HttpPost("assessment/me/submit")]
    public async Task<ActionResult<CompetencyAssessmentResponse>> SubmitMyAssessment()
    {
        var assessment = await _assessmentService.SubmitAsync(User.GetUserId());
        return Ok(assessment);
    }

    /// <summary>Abre uma nova autoavaliação a partir das respostas do último envio.</summary>
    [Authorize]
    [HttpPost("assessment/me/restart")]
    public async Task<ActionResult<CompetencyAssessmentResponse>> RestartMyAssessment()
    {
        var assessment = await _assessmentService.RestartAsync(User.GetUserId());
        return Ok(assessment);
    }

    /// <summary>
    /// Relatório do último envio: notas por competência, o que melhorar e a leitura de como a pessoa estava no dia.
    /// tzOffsetMinutes é o Date.getTimezoneOffset() do navegador. 204 se o usuário ainda não enviou nenhum.
    /// </summary>
    [Authorize]
    [HttpGet("assessment/me/report")]
    public async Task<ActionResult<CompetencyReportResponse>> GetMyReport([FromQuery] int tzOffsetMinutes = 0)
    {
        var report = await _reportService.GetMyReportAsync(User.GetUserId(), tzOffsetMinutes);
        return report is null ? NoContent() : Ok(report);
    }
}
