using FluentValidation;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Validators;

public class ProjectValidator : AbstractValidator<Project>
{
    public ProjectValidator()
    {
        RuleFor(p => p.Name).NotEmpty().MaximumLength(200);
        RuleFor(p => p.Description).MaximumLength(2000);
    }
}
