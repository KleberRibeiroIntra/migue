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
public class SoftSkillController : ControllerBase
{
    private readonly ISoftSkillService _softSkillService;
    private readonly IUserSoftSkillAnswerService _answerService;
    private readonly ISoftSkillReportService _reportService;

    public SoftSkillController(ISoftSkillService softSkillService, IUserSoftSkillAnswerService answerService,
        ISoftSkillReportService reportService)
    {
        _softSkillService = softSkillService;
        _answerService = answerService;
        _reportService = reportService;
    }

    [HttpGet("paged")]
    public async Task<ActionResult<DynamicQueryResult<SoftSkillResponse>>> GetPaged([FromQuery] SoftSkillQueryRequest query)
    {
        var result = await _softSkillService.GetPagedAsync(query);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<SoftSkillResponse>> GetById(Guid id)
    {
        var softSkill = await _softSkillService.GetByIdAsync(id);
        return softSkill is null ? NotFound() : Ok(softSkill);
    }

    [HttpPost]
    public async Task<ActionResult<SoftSkillResponse>> Create(SoftSkillRequest request)
    {
        var created = await _softSkillService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<SoftSkillResponse>> Update(Guid id, SoftSkillRequest request)
    {
        var updated = await _softSkillService.UpdateAsync(id, request);
        return updated is null ? NotFound() : Ok(updated);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _softSkillService.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }

    /// <summary>Respostas mais recentes do usuário autenticado, uma por soft skill.</summary>
    [Authorize]
    [HttpGet("answers/me")]
    public async Task<ActionResult<List<UserSoftSkillAnswerResponse>>> GetMyAnswers()
    {
        var answers = await _answerService.GetLatestByUserAsync(User.GetUserId());
        return Ok(answers);
    }

    /// <summary>Salva uma nova rodada de respostas do usuário autenticado.</summary>
    [Authorize]
    [HttpPost("answers")]
    public async Task<ActionResult<List<UserSoftSkillAnswerResponse>>> SaveMyAnswers(SaveUserSoftSkillAnswersRequest request)
    {
        var answers = await _answerService.SaveAsync(User.GetUserId(), request);
        return Ok(answers);
    }

    /// <summary>Análise da última autoavaliação: pontos fortes, fracos, dicas e evolução. 204 se o usuário nunca respondeu.</summary>
    [Authorize]
    [HttpGet("answers/me/report")]
    public async Task<ActionResult<SoftSkillReportResponse>> GetMyReport()
    {
        var report = await _reportService.GetMyReportAsync(User.GetUserId());
        return report is null ? NoContent() : Ok(report);
    }
}
