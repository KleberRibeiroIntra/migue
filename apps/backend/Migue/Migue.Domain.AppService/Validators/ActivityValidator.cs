using FluentValidation;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Validators;

public class ActivityValidator : AbstractValidator<Activity>
{
    public ActivityValidator()
    {
        RuleFor(a => a.UserId).NotEmpty();
        RuleFor(a => a.Title).NotEmpty().MaximumLength(200);
        RuleFor(a => a.Description).MaximumLength(2000);
        RuleFor(a => a.SelfScoreComment).MaximumLength(2000);
    }
}
