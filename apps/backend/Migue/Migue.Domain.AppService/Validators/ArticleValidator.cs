using FluentValidation;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Validators;

public class ArticleValidator : AbstractValidator<Article>
{
    public ArticleValidator()
    {
        RuleFor(a => a.Title).NotEmpty().MaximumLength(200);
        RuleFor(a => a.Slug).NotEmpty().MaximumLength(200)
            .Matches("^[a-z0-9]+(-[a-z0-9]+)*$")
            .WithMessage("O slug só pode ter letra minúscula, número e hífen (ex: como-nao-dar-migue).");
        RuleFor(a => a.Summary).MaximumLength(500);
        RuleFor(a => a.Content).NotEmpty();
    }
}
