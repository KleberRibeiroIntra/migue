using Migue.Domain.Entities;

namespace Migue.Domain.Repositories;

public interface IUserRepository : IRepositoryBase<User>
{
    Task<User?> GetByEmailAsync(string email);
    Task<bool> ExistsByEmailAsync(string email);
}
