using Migue.Domain.Entities;

namespace Migue.Domain.Repositories;

public interface IActivityRepository : IRepositoryBase<Activity>
{
    /// <summary>Atividades do usuário cujo dia (StartedAt, ou CreatedAt quando vazio) cai em [from, to), mais recentes primeiro.</summary>
    Task<List<Activity>> GetByUserAsync(Guid userId, DateTime from, DateTime to);
}
