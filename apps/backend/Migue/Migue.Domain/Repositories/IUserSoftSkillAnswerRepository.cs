using Migue.Domain.Entities;

namespace Migue.Domain.Repositories;

public interface IUserSoftSkillAnswerRepository : IRepositoryBase<UserSoftSkillAnswer>
{
    /// <summary>Resposta mais recente do usuário para cada soft skill, com a opção escolhida.</summary>
    Task<List<UserSoftSkillAnswer>> GetLatestByUserAsync(Guid userId);
}
