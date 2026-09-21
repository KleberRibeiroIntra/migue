using AutoMapper;
using FluentValidation;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.AppService.Services;

public class UserService : ServiceBase<User, UserRequest, UserResponse>, IUserService
{
    public UserService(IUserRepository repository, IMapper mapper, IValidator<User> validator)
        : base(repository, mapper, validator)
    {
    }
}
