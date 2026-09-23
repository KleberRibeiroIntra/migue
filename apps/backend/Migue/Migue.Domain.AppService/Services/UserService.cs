using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;
using Migue.Domain.Security;

namespace Migue.Domain.AppService.Services;

public class UserService : ServiceBase<User, UserRequest, UserResponse>, IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IJwtTokenGenerator _tokenGenerator;

    public UserService(IUserRepository repository, IMapper mapper, IValidator<User> validator, IJwtTokenGenerator tokenGenerator)
        : base(repository, mapper, validator)
    {
        _userRepository = repository;
        _mapper = mapper;
        _tokenGenerator = tokenGenerator;
    }

    protected override async Task ValidateCreateAsync(User entity)
    {
        await base.ValidateCreateAsync(entity);
        await EnsureEmailIsUniqueAsync(entity);
    }

    protected override async Task ValidateUpdateAsync(User entity)
    {
        await base.ValidateUpdateAsync(entity);
        await EnsureEmailIsUniqueAsync(entity);
    }

    private async Task EnsureEmailIsUniqueAsync(User entity)
    {
        var existing = await _userRepository.GetByEmailAsync(entity.Email);
        if (existing is not null && existing.NavigationId != entity.NavigationId)
            throw new ValidationException([new ValidationFailure(nameof(User.Email), "Já existe um usuário com este e-mail.")]);
    }

    public async Task<LoginResponse?> LoginAsync(LoginRequest request)
    {
        var user = await _userRepository.GetByEmailAsync(request.Email);
        if (user is null || !PasswordHasher.Verify(request.Password, user.PasswordHash))
            return null;

        var (token, expiresAt) = _tokenGenerator.GenerateToken(user);

        return new LoginResponse
        {
            Token = token,
            ExpiresAt = expiresAt,
            User = _mapper.Map<UserResponse>(user)
        };
    }
}
