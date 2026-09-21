using FluentValidation;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Validators;

public class UserValidator : AbstractValidator<User>
{
    public UserValidator()
    {
        RuleFor(u => u.Name).NotEmpty().MaximumLength(200);
        RuleFor(u => u.Email).NotEmpty().EmailAddress().MaximumLength(320);
        RuleFor(u => u.PasswordHash).NotEmpty();
    }
}
