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
public class ActivityController : ControllerBase
{
    private readonly IActivityService _activityService;

    public ActivityController(IActivityService activityService)
    {
        _activityService = activityService;
    }

    [HttpGet("paged")]
    public async Task<ActionResult<DynamicQueryResult<ActivityResponse>>> GetPaged([FromQuery] ActivityQueryRequest query)
    {
        var result = await _activityService.GetPagedAsync(query);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ActivityResponse>> GetById(Guid id)
    {
        var activity = await _activityService.GetByIdAsync(id);
        return activity is null ? NotFound() : Ok(activity);
    }

    [HttpPost]
    public async Task<ActionResult<ActivityResponse>> Create(ActivityRequest request)
    {
        var created = await _activityService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ActivityResponse>> Update(Guid id, ActivityRequest request)
    {
        var updated = await _activityService.UpdateAsync(id, request);
        return updated is null ? NotFound() : Ok(updated);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _activityService.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }

    /// <summary>Autoavaliação do usuário autenticado na atividade: estrelas, justificativas e comentário. Substitui a avaliação anterior.</summary>
    [Authorize]
    [HttpPut("{id:guid}/score")]
    public async Task<ActionResult<ActivityResponse>> Score(Guid id, ScoreActivityRequest request)
    {
        var scored = await _activityService.ScoreAsync(id, User.GetUserId(), request);
        return scored is null ? NotFound() : Ok(scored);
    }
}
