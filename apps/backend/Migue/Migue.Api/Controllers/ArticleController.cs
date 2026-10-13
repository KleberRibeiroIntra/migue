using Microsoft.AspNetCore.Mvc;
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

    /// <summary>Artigo publicado pelo slug (ex: agilidade-o-que-fazer-ainda-hoje).</summary>
    [HttpGet("{slug}")]
    public async Task<ActionResult<ArticleResponse>> GetBySlug(string slug)
    {
        var article = await _articleService.GetPublishedBySlugAsync(slug);
        return article is null ? NotFound() : Ok(article);
    }
}
