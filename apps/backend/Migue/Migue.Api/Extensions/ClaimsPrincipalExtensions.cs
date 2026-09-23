using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Migue.Api.Extensions;

public static class ClaimsPrincipalExtensions
{
    /// <summary>NavigationId do usuário autenticado (claim "sub" do JWT).</summary>
    public static Guid GetUserId(this ClaimsPrincipal user)
    {
        var value = user.FindFirstValue(ClaimTypes.NameIdentifier) ?? user.FindFirstValue(JwtRegisteredClaimNames.Sub);
        return Guid.TryParse(value, out var id)
            ? id
            : throw new UnauthorizedAccessException("Token sem identificação do usuário.");
    }
}
