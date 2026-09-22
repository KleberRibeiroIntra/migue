using AutoMapper;
using FluentValidation;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.AppService.Services;

public class SoftSkillService : ServiceBase<SoftSkill, SoftSkillRequest, SoftSkillResponse>, ISoftSkillService
{
    public SoftSkillService(ISoftSkillRepository repository, IMapper mapper, IValidator<SoftSkill> validator)
        : base(repository, mapper, validator)
    {
    }
}
