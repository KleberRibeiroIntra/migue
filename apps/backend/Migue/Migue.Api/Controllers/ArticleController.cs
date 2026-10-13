using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Migue.Api.Extensions;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.AppService.Services;

namespace Migue.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ArticleController : ControllerBase
{
    private readonly IArticleService _articleService;

    public ArticleController(IArticleService articleService)
    {
        _articleService = articleService;
    }

    /// <summary>Artigos publicados, mais recentes primeiro.</summary>
    [HttpGet]
    public async Task<ActionResult<List<ArticleResponse>>> GetPublished()
    {
        var articles = await _articleService.GetPublishedAsync();
        return Ok(articles);
    }

    /// <summary>Tags ativas pra escolher na edição do artigo.</summary>
    [HttpGet("tags")]
    public async Task<ActionResult<List<TagResponse>>> GetTags()
    {
        var tags = await _articleService.GetTagsAsync();
        return Ok(tags);
    }

    /// <summary>Artigo pelo id, inclusive rascunho (usado na edição).</summary>
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ArticleResponse>> GetById(Guid id)
    {
        var article = await _articleService.GetByIdAsync(id);
        return article is null ? NotFound() : Ok(article);
    }

    /// <summary>Artigo publicado pelo slug (ex: agilidade-o-que-fazer-ainda-hoje).</summary>
    [HttpGet("{slug}")]
    public async Task<ActionResult<ArticleResponse>> GetBySlug(string slug)
    {
        var article = await _articleService.GetPublishedBySlugAsync(slug);
        return article is null ? NotFound() : Ok(article);
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ArticleResponse>> Update(Guid id, ArticleRequest request)
    {
        var updated = await _articleService.UpdateWithTagsAsync(id, request, User.GetUserId());
        return updated is null ? NotFound() : Ok(updated);
    }
}
