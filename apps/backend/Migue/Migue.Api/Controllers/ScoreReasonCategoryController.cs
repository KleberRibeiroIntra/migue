using Microsoft.AspNetCore.Mvc;
using Migue.Domain;
using Migue.Domain.AppService.Dtos.QueryRequests;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.AppService.Services;

namespace Migue.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ScoreReasonCategoryController : ControllerBase
{
    private readonly IScoreReasonCategoryService _categoryService;

    public ScoreReasonCategoryController(IScoreReasonCategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    /// <summary>Categorias ativas na ordem de exibição.</summary>
    [HttpGet]
    public async Task<ActionResult<List<ScoreReasonCategoryResponse>>> GetActive()
    {
        var categories = await _categoryService.GetActiveAsync();
        return Ok(categories);
    }

    [HttpGet("paged")]
    public async Task<ActionResult<DynamicQueryResult<ScoreReasonCategoryResponse>>> GetPaged(
        [FromQuery] ScoreReasonCategoryQueryRequest query)
    {
        var result = await _categoryService.GetPagedAsync(query);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ScoreReasonCategoryResponse>> GetById(Guid id)
    {
        var category = await _categoryService.GetByIdAsync(id);
        return category is null ? NotFound() : Ok(category);
    }

    [HttpPost]
    public async Task<ActionResult<ScoreReasonCategoryResponse>> Create(ScoreReasonCategoryRequest request)
    {
        var created = await _categoryService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ScoreReasonCategoryResponse>> Update(Guid id, ScoreReasonCategoryRequest request)
    {
        var updated = await _categoryService.UpdateAsync(id, request);
        return updated is null ? NotFound() : Ok(updated);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        if (await _categoryService.HasScoreReasonsAsync(id))
            return Problem(title: "Essa categoria tem justificativa pendurada nela, não dá pra excluir.",
                statusCode: StatusCodes.Status409Conflict);

        var deleted = await _categoryService.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
