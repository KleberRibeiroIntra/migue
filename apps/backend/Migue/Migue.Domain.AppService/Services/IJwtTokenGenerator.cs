using Migue.Domain.Entities;

namespace Migue.Domain.AppService.Services;

public interface IJwtTokenGenerator
{
    (string Token, DateTime ExpiresAt) GenerateToken(User user);
}
