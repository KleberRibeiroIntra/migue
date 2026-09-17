using Microsoft.EntityFrameworkCore;
using Migue.Domain.Entities;

namespace Migue.Domain.Data;

public class MigueDbContext : DbContext
{
    public MigueDbContext(DbContextOptions<MigueDbContext> options) : base(options)
    {
    }

    public DbSet<Activity> Activities => Set<Activity>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        RegisterAllEntities(modelBuilder);


        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MigueDbContext).Assembly);
    }

    private void RegisterAllEntities(ModelBuilder modelBuilder)
    {
        var domainAssembly = typeof(User).Assembly;

        var entities = domainAssembly.GetTypes()
            .Where(type => type.IsClass && !type.IsAbstract && typeof(BaseEntity).IsAssignableFrom(type));

        foreach (var entity in entities)
        {
            modelBuilder.Entity(entity);
        }
    }
}
