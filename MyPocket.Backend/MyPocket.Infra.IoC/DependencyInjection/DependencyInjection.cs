using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using MyPocket.Domain.Interfaces;
using MyPocket.Domain.Models;
using Microsoft.EntityFrameworkCore;
using MyPocket.Infra.Repository;
using MyPocket.Application.Services;
using MyPocket.Infra.Data.Context;
using MyPocket.Application.Interfaces;

namespace MyPocket.Infra.IoC.DependencyInjection
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
          option.MigrationsAssembly("MyPocket.Infra.Data");
        });
      });
      services.AddIdentityCore<User>().AddEntityFrameworkStores<MyPocketDBContext>().AddDefaultUI().AddDefaultTokenProviders();
      return services;
    }
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
      services.AddScoped<IRepositories, Repositories>();
      services.AddScoped<IApplicationService, ApplicationService>();
      return services;
    }
  }
}