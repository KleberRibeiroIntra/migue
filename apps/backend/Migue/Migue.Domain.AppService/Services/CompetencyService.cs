using AutoMapper;
using FluentValidation;
using Migue.Domain.AppService.Dtos.Requests;
using Migue.Domain.AppService.Dtos.Responses;
using Migue.Domain.Entities;
using Migue.Domain.Repositories;

namespace Migue.Domain.AppService.Services;

public class CompetencyService : ServiceBase<Competency, CompetencyRequest, CompetencyResponse>, ICompetencyService
{
    public CompetencyService(ICompetencyRepository repository, IMapper mapper, IValidator<Competency> validator)
        : base(repository, mapper, validator)
    {
    }
}
