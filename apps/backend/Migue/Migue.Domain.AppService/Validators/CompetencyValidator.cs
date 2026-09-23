using FluentValidation;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Validators;

public class CompetencyValidator : AbstractValidator<Competency>
{
    public CompetencyValidator()
    {
        RuleFor(c => c.Name).NotEmpty().MaximumLength(200);
        RuleFor(c => c.Order).GreaterThanOrEqualTo(0);
    }
}
