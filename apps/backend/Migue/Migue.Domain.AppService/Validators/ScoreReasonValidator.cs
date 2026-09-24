using FluentValidation;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Validators;

public class ScoreReasonValidator : AbstractValidator<ScoreReason>
{
    public ScoreReasonValidator()
    {
        RuleFor(r => r.Description).NotEmpty().MaximumLength(200);
        RuleFor(r => r.Category).IsInEnum();
        RuleFor(r => r.Sentiment).IsInEnum();
        RuleFor(r => r.Order).GreaterThanOrEqualTo(0);
    }
}
