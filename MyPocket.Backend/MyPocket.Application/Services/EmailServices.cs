using MyPocket.Application.Interfaces;

namespace MyPocket.Application.Services
{
  public class EmailServices : IEmailServices
  {
    public Task SendEmail(List<string> to, string subject, string body)
    {
      throw new NotImplementedException();
    }
  }
}