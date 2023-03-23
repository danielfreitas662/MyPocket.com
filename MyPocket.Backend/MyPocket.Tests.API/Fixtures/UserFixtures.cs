using System.Collections.Generic;
using MyPocket.Application.DTO;
using System;

namespace MyPocket.Tests.API.Fixtures
{
  public static class UserFixtures
  {
    private static List<UserDTO> Users = new List<UserDTO>{
      new UserDTO{
        Id = "1",
        FirstName ="Rob",
        LastName ="Wood",
        Email ="robwood@gmail.com"
      },
      new UserDTO{
        Id = "2",
        FirstName ="Clayton",
        LastName ="Ford",
        Email ="claytonford@gmail.com"
      },
      new UserDTO{
        Id ="3",
        FirstName ="Daniel",
        LastName ="Lord",
        Email ="daniellord@gmail.com"
      },
      new UserDTO{
        Id = "4",
        FirstName ="John",
        LastName ="Donald",
        Email ="johndonald@gmail.com"
      },
    };

    public static List<UserDTO> GetUsers() => Users;
  }
}