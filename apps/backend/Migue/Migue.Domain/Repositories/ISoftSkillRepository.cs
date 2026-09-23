using Migue.Domain.Entities;

namespace Migue.Domain.Repositories;

public interface ISoftSkillRepository : IRepositoryBase<SoftSkill>
{
    Task<List<SoftSkill>> GetAllWithOptionsAsync();
}
