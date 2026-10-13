using AutoMapper;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Repositories;

namespace Migue.Domain.AppService.Services;

public class ArticleService : IArticleService
{
    private readonly IArticleRepository _articleRepository;
    private readonly IMapper _mapper;

    public ArticleService(IArticleRepository articleRepository, IMapper mapper)
    {
        _articleRepository = articleRepository;
        _mapper = mapper;
    }

    public async Task<List<ArticleResponse>> GetPublishedAsync()
    {
        var articles = await _articleRepository.GetPublishedAsync();
        return _mapper.Map<List<ArticleResponse>>(articles);
    }

    public async Task<ArticleResponse?> GetPublishedBySlugAsync(string slug)
    {
        var article = await _articleRepository.GetPublishedBySlugAsync(slug);
        return article is null ? null : _mapper.Map<ArticleResponse>(article);
    }
}
