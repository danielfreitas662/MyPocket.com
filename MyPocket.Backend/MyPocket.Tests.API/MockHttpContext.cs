
using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using MyPocket.Application.DTO;
using MyPocket.Infra.Data.Context;

namespace MyPocket.Tests.API
{
  public class MockHttpContext
  {

    public DefaultHttpContext context { get; }
    public MockHttpContext()
    {
      context = new DefaultHttpContext
      {
        User = null
      };
    }
    public MockHttpContext(UserData user) : this()
    {
      context = new DefaultHttpContext
      {
        User = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]{
          new Claim(ClaimTypes.Name, user.UserName.ToString()),
          new Claim("UserID", user.UserId, "string"),
          new Claim("Email", user.Email, "string"),
          new Claim("Name", user.UserName, "string")
        }))
      };
    }

  }
}