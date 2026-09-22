using Microsoft.AspNetCore.Mvc;
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

    public SoftSkillController(ISoftSkillService softSkillService)
    {
        _softSkillService = softSkillService;
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
}
