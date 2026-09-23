namespace Migue.Domain.AppService.Dtos.Requests;

public class SaveUserSoftSkillAnswersRequest
{
    public List<UserSoftSkillAnswerRequest> Answers { get; set; } = new();
}
