using AutoMapper;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.Entities;
using Migue.Domain.Security;

namespace Migue.Domain.AppService.Mappings;

public class RequestMappingProfile : Profile
{
    public RequestMappingProfile()
    {
        // os vínculos com projeto são sincronizados no ActivityService (precisam validar se os projetos existem);
        // a nota só muda por PUT/DELETE /Activity/{id}/score, senão editar a atividade apagaria a autoavaliação
        CreateMap<ActivityRequest, Activity>()
            .ForMember(dest => dest.Projects, opt => opt.Ignore())
            .ForMember(dest => dest.SelfScore, opt => opt.Ignore())
            .ForMember(dest => dest.SelfScoreComment, opt => opt.Ignore());
        CreateMap<CompetencyRequest, Competency>();
        CreateMap<ProjectRequest, Project>();
        CreateMap<ScoreReasonRequest, ScoreReason>();
        CreateMap<ScoreReasonCategoryRequest, ScoreReasonCategory>();
        CreateMap<SoftSkillRequest, SoftSkill>();
        CreateMap<UserSoftSkillAnswerRequest, UserSoftSkillAnswer>();
        CreateMap<UserRequest, User>()
            .ForMember(dest => dest.PasswordHash, opt =>
            {
                opt.PreCondition(src => !string.IsNullOrWhiteSpace(src.Password));
                opt.MapFrom(src => PasswordHasher.Hash(src.Password));
            });
    }
}
