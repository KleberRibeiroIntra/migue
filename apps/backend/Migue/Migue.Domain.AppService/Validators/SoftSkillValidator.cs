using FluentValidation;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Validators;

public class SoftSkillValidator : AbstractValidator<SoftSkill>
{
    public SoftSkillValidator()
    {
        RuleFor(s => s.Name).NotEmpty().MaximumLength(200);
        RuleFor(s => s.Note).NotEmpty().MaximumLength(2000);
        RuleFor(s => s.Order).GreaterThanOrEqualTo(0);
    }
}
