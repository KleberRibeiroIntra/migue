using Microsoft.EntityFrameworkCore;
using Migue.Domain.Entities;
using Migue.Domain.Enums;
using Migue.Domain.Repositories;

namespace Migue.Domain.Data.Repositories;

public class CompetencyAssessmentRepository : RepositoryBase<CompetencyAssessment>, ICompetencyAssessmentRepository
{
    public CompetencyAssessmentRepository(MigueDbContext context) : base(context)
    {
    }

    public Task<CompetencyAssessment?> GetDraftByUserAsync(Guid userId) =>
        DbSet.Include(a => a.Answers)
            .Where(a => a.UserId == userId && a.Active && a.Status == CompetencyAssessmentStatus.Draft)
            .OrderByDescending(a => a.CreatedAt)
            .FirstOrDefaultAsync();

    public async Task<CompetencyAssessment?> GetCurrentByUserAsync(Guid userId) =>
        await GetDraftByUserAsync(userId)
        ?? await DbSet.Include(a => a.Answers)
            .Where(a => a.UserId == userId && a.Active && a.Status == CompetencyAssessmentStatus.Submitted)
            .OrderByDescending(a => a.SubmittedAt)
            .FirstOrDefaultAsync();

    public Task<CompetencyAssessment?> GetLatestSubmittedByUserAsync(Guid userId) =>
        DbSet.Include(a => a.Answers)
            .Where(a => a.UserId == userId && a.Active && a.Status == CompetencyAssessmentStatus.Submitted)
            .OrderByDescending(a => a.SubmittedAt)
            .FirstOrDefaultAsync();

    public Task<List<CompetencyQuestion>> GetActiveQuestionsAsync() =>
        Context.Set<CompetencyQuestion>()
            .Where(q => q.Active && q.Competency!.Active)
            .Include(q => q.Competency)
            .Include(q => q.Options.Where(o => o.Active))
            .ToListAsync();
}
