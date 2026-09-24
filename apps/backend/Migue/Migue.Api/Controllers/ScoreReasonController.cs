using Microsoft.AspNetCore.Mvc;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.AppService.Services;
using Migue.Domain.Enums;

namespace Migue.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ScoreReasonController : ControllerBase
{
    private readonly IScoreReasonService _scoreReasonService;

    public ScoreReasonController(IScoreReasonService scoreReasonService)
    {
        _scoreReasonService = scoreReasonService;
    }

    /// <summary>Justificativas na ordem de exibição. Filtre por sentimento para mostrar só as que combinam com a nota.</summary>
    [HttpGet]
    public async Task<ActionResult<List<ScoreReasonResponse>>> GetAll([FromQuery] ScoreReasonSentiment? sentiment)
    {
        var reasons = await _scoreReasonService.GetBySentimentAsync(sentiment);
        return Ok(reasons);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ScoreReasonResponse>> GetById(Guid id)
    {
        var reason = await _scoreReasonService.GetByIdAsync(id);
        return reason is null ? NotFound() : Ok(reason);
    }

    [HttpPost]
    public async Task<ActionResult<ScoreReasonResponse>> Create(ScoreReasonRequest request)
    {
        var created = await _scoreReasonService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ScoreReasonResponse>> Update(Guid id, ScoreReasonRequest request)
    {
        var updated = await _scoreReasonService.UpdateAsync(id, request);
        return updated is null ? NotFound() : Ok(updated);
    }

    /// <summary>Desativa a justificativa em vez de apagar, para não perder o histórico das atividades que já a usaram.</summary>
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deactivated = await _scoreReasonService.UpdateAsync(id, reason => reason.Active = false);
        return deactivated is null ? NotFound() : NoContent();
    }
}
