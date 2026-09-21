using Migue.Api.Middlewares;
using Migue.Domain.Data;
using Migue.IoC;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connectionString = builder.Configuration.GetConnectionString("Default")
    ?? "Data Source=migue.db";
builder.Services.AddDependencyInjectionConfiguration(connectionString);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<MigueDbContext>();
    await DbSeeder.SeedProjectsAsync(context);
}

app.UseHttpsRedirection();

app.UseMiddleware<ValidationExceptionMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
