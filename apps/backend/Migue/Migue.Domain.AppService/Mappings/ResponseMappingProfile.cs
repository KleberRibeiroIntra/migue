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

        CreateMap<Project, ProjectResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NavigationId));

        CreateMap<SoftSkillOption, SoftSkillOptionResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NavigationId));

        CreateMap<SoftSkill, SoftSkillResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NavigationId));

        CreateMap<User, UserResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NavigationId));
    }
}
