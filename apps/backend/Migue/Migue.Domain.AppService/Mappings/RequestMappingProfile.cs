using AutoMapper;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.Entities;
using Migue.Domain.Security;

namespace Migue.Domain.AppService.Mappings;

public class RequestMappingProfile : Profile
{
    public RequestMappingProfile()
    {
        CreateMap<ActivityRequest, Activity>();
        CreateMap<CompetencyRequest, Competency>();
        CreateMap<ProjectRequest, Project>();
        CreateMap<ScoreReasonRequest, ScoreReason>();
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
