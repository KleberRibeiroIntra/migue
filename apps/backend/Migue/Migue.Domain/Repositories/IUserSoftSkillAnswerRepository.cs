using Migue.Domain.Entities;

namespace Migue.Domain.Repositories;

public interface IUserSoftSkillAnswerRepository : IRepositoryBase<UserSoftSkillAnswer>
{
    /// <summary>Resposta mais recente do usuário para cada soft skill, com a opção escolhida.</summary>
    Task<List<UserSoftSkillAnswer>> GetLatestByUserAsync(Guid userId);

    /// <summary>Todas as respostas do usuário (histórico completo), com a opção e a soft skill.</summary>
    Task<List<UserSoftSkillAnswer>> GetAllByUserAsync(Guid userId);
}
