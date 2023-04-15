namespace MyPocket.Application.Interfaces
{
  public interface IEmailServices
  {
    Task SendEmail(List<string> to, string subject, string body);
  }
}