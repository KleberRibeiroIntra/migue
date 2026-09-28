using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Data.Sqlite;
using Microsoft.IdentityModel.Tokens;
using Migue.Api.Middlewares;
using Migue.Api.Security;
using Migue.Domain.AppService.Services;
using Migue.Domain.Data;
using Migue.IoC;

const string DevCorsPolicy = "DevCors";

var builder = WebApplication.CreateBuilder(args);

// Adiciona os serviços ao container.

builder.Services.AddCors(options =>
{
    options.AddPolicy(DevCorsPolicy, policy =>
    {
        policy.SetIsOriginAllowed(origin =>
                Uri.TryCreate(origin, UriKind.Absolute, out var uri) && uri.Host == "localhost")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connectionString = ResolveSqlitePath(
    builder.Configuration.GetConnectionString("Default") ?? "Data Source=Database/migue.db",
    builder.Environment.ContentRootPath);
builder.Services.AddDependencyInjectionConfiguration(connectionString);

builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

var jwtSection = builder.Configuration.GetSection("Jwt");
var jwtKey = jwtSection["Key"] ?? throw new InvalidOperationException("Jwt:Key is not configured.");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSection["Issuer"],
            ValidAudience = jwtSection["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        };
    });
builder.Services.AddAuthorization();

var app = builder.Build();

// Configura o pipeline de requisições HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    await DbSeeder.SeedAsync(app.Services);
}

app.UseHttpsRedirection();

app.UseCors(DevCorsPolicy);

app.UseMiddleware<ValidationExceptionMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

// Caminho relativo do banco resolve a partir da pasta do projeto (não de onde o comando rodou), e a pasta é criada
// se não existir: o SQLite cria o arquivo, mas não o diretório.
static string ResolveSqlitePath(string connectionString, string contentRoot)
{
    var sqlite = new SqliteConnectionStringBuilder(connectionString);
    if (sqlite.DataSource != ":memory:" && !Path.IsPathRooted(sqlite.DataSource))
        sqlite.DataSource = Path.Combine(contentRoot, sqlite.DataSource);

    var directory = Path.GetDirectoryName(sqlite.DataSource);
    if (!string.IsNullOrEmpty(directory))
        Directory.CreateDirectory(directory);

    return sqlite.ToString();
}
