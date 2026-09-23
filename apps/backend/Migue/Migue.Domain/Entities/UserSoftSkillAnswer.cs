namespace Migue.Domain.Entities;

// Cada salvamento insere uma nova linha (nunca atualiza uma existente), então o BaseEntity.CreatedAt já é o timestamp dessa resposta.
public record UserSoftSkillAnswer : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid SoftSkillId { get; set; }
    public Guid SoftSkillOptionId { get; set; }

    public User? User { get; set; }
    public SoftSkill? SoftSkill { get; set; }
    public SoftSkillOption? SoftSkillOption { get; set; }
}
