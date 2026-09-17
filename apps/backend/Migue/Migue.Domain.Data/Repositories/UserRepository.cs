using Microsoft.EntityFrameworkCore;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.Data.Repositories;

public class UserRepository : RepositoryBase<User>, IUserRepository
{
    private readonly MigueDbContext _context;

    public UserRepository(MigueDbContext context) : base(context)
    {
        _context = context;
    }

    public Task<User?> GetByEmailAsync(string email) =>
        _context.Set<User>().FirstOrDefaultAsync(u => u.Email == email && u.Active);

    public Task<bool> ExistsByEmailAsync(string email) =>
        _context.Set<User>().AnyAsync(u => u.Email == email && u.Active);
}
