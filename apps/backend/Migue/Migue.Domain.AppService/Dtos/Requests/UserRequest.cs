namespace Migue.Domain.AppService.Dtos.Requests;

public class UserRequest
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    /// <summary>Senha em texto puro. Vazia no update mantém a senha atual.</summary>
    public string Password { get; set; } = string.Empty;
}
