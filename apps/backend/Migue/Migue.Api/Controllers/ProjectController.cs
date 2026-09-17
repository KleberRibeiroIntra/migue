using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Migue.Domain;
using Migue.Domain.AppService.Dtos.QueryRequests;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;
using Migue.Domain.Services;

namespace Migue.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ProjectController : ControllerBase
{
    private readonly IProjectService _projectService;
    private readonly IMapper _mapper;

    public ProjectController(IProjectService projectService, IMapper mapper)
    {
        _projectService = projectService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProjectResponse>>> GetAll()
    {
        var projects = await _projectService.GetAllAsync();
        return Ok(_mapper.Map<List<ProjectResponse>>(projects));
    }

    [HttpGet("paged")]
    public async Task<ActionResult<DynamicQueryResult<ProjectResponse>>> GetPaged([FromQuery] ProjectQueryRequest query)
    {
        var result = await _projectService.GetPagedAsync(query);

        var response = new DynamicQueryResult<ProjectResponse>(result.PageSize)
        {
            PageNumber = result.PageNumber,
            TotalRows = result.TotalRows,
            QueryString = result.QueryString,
            Result = _mapper.Map<List<ProjectResponse>>(result.Result)
        };

        return Ok(response);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProjectResponse>> GetById(Guid id)
    {
        var project = await _projectService.GetByIdAsync(id);
        return project is null ? NotFound() : Ok(_mapper.Map<ProjectResponse>(project));
    }

    [HttpPost]
    public async Task<ActionResult<ProjectResponse>> Create(ProjectRequest request)
    {
        var project = _mapper.Map<Project>(request);
        var created = await _projectService.CreateAsync(project);
        return CreatedAtAction(nameof(GetById), new { id = created.NavigationId }, _mapper.Map<ProjectResponse>(created));
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ProjectResponse>> Update(Guid id, ProjectRequest request)
    {
        var existing = await _projectService.GetByIdAsync(id);
        if (existing is null)
            return NotFound();

        _mapper.Map(request, existing);

        var updated = await _projectService.UpdateAsync(existing);
        return Ok(_mapper.Map<ProjectResponse>(updated));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var existing = await _projectService.GetByIdAsync(id);
        if (existing is null)
            return NotFound();

        await _projectService.DeleteAsync(existing);
        return NoContent();
    }
}
