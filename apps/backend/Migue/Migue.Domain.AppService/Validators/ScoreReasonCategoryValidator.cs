using FluentValidation;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Validators;

public class ScoreReasonCategoryValidator : AbstractValidator<ScoreReasonCategory>
{
    public ScoreReasonCategoryValidator()
    {
        RuleFor(c => c.Name).NotEmpty().MaximumLength(100);
        RuleFor(c => c.Description).MaximumLength(500);
        RuleFor(c => c.Order).GreaterThanOrEqualTo(0);
    }
}
