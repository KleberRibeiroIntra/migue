using AutoMapper;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Mappings;

public class ResponseMappingProfile : Profile
{
    public ResponseMappingProfile()
    {
        CreateMap<Activity, ActivityResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NavigationId));

        CreateMap<CompetencyQuestionOption, CompetencyQuestionOptionResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NavigationId));

        CreateMap<CompetencyQuestion, CompetencyQuestionResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NavigationId));

        CreateMap<Competency, CompetencyResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NavigationId));

        CreateMap<Project, ProjectResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NavigationId));

        CreateMap<SoftSkillOption, SoftSkillOptionResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NavigationId));

        CreateMap<UserCompetencyAnswer, CompetencyAnswerResponse>();

        CreateMap<CompetencyAssessment, CompetencyAssessmentResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NavigationId));

        CreateMap<UserSoftSkillAnswer, UserSoftSkillAnswerResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NavigationId))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.SoftSkillOption!.Value))
            .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.SoftSkillOption!.Label));

        CreateMap<SoftSkill, SoftSkillResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NavigationId));

        CreateMap<User, UserResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NavigationId));
    }
}
