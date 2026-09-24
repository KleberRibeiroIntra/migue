using Microsoft.EntityFrameworkCore;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.Data.Repositories;

public class UserSoftSkillAnswerRepository : RepositoryBase<UserSoftSkillAnswer>, IUserSoftSkillAnswerRepository
{
    public UserSoftSkillAnswerRepository(MigueDbContext context) : base(context)
    {
    }

    public Task<List<UserSoftSkillAnswer>> GetAllByUserAsync(Guid userId) =>
        DbSet
            .Where(a => a.UserId == userId && a.Active)
            .Include(a => a.SoftSkillOption)
            .Include(a => a.SoftSkill)
            .ToListAsync();

    public async Task<List<UserSoftSkillAnswer>> GetLatestByUserAsync(Guid userId)
    {
        var answers = await GetAllByUserAsync(userId);

        // Agrupa em memória: o volume por usuário é pequeno e o SQLite não traduz bem GroupBy + First.
        return answers
            .GroupBy(a => a.SoftSkillId)
            .Select(g => g.OrderByDescending(a => a.CreatedAt).ThenByDescending(a => a.Id).First())
            .ToList();
    }
}
