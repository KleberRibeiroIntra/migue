using Migue.Domain.Entities;
using Migue.Domain.Repositories;
using Migue.Domain.Services;

namespace Migue.Domain.AppService.Services;

public class UserService : ServiceBase<User>, IUserService
{
    public UserService(IUserRepository repository) : base(repository)
    {
    }
}
