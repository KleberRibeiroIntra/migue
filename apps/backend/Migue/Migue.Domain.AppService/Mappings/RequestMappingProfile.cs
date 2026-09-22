using AutoMapper;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Mappings;

public class RequestMappingProfile : Profile
{
    public RequestMappingProfile()
    {
        CreateMap<ActivityRequest, Activity>();
        CreateMap<ProjectRequest, Project>();
        CreateMap<SoftSkillRequest, SoftSkill>();
        CreateMap<UserRequest, User>();
    }
}
