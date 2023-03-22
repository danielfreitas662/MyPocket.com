using Microsoft.Extensions.DependencyInjection;
using ElevarGestao.Infra.Data.Context;
using Microsoft.AspNetCore.Identity;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;
using Microsoft.EntityFrameworkCore;
using MyPocket.Infra.Repository;

namespace MyPocket.Infra.DependencyInjection
{
  public static class DependencyInjection
  {
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
    {

      services.AddDbContext<MyPocketDBContext>(opt =>
      {
        opt.UseNpgsql(connectionString, option =>
        {
          option.CommandTimeout(120);
          option.MigrationsAssembly("ElevarGestao.Infra.Migrations");
        });
      });
      services.AddIdentityCore<User>().AddEntityFrameworkStores<MyPocketDBContext>().AddDefaultUI().AddDefaultTokenProviders();
      return services;
    }
    public static IServiceCollection AddServices(this IServiceCollection services)
    {

      services.AddScoped<IRepositories, Repositories>();

      return services;
    }
  }
}