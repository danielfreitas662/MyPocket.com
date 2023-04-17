using System.Security.Claims;
using System.Security.Principal;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

using MyPocket.Domain.Models;
using MyPocket.Infra.EntityConfiguration;

namespace MyPocket.Infra.Data.Context
{
  public class BloggingContextFactory : IDesignTimeDbContextFactory<MyPocketDBContext>
  {
    public MyPocketDBContext CreateDbContext(string[] args)
    {
      var optionsBuilder = new DbContextOptionsBuilder<MyPocketDBContext>();
      optionsBuilder.UseNpgsql("Host=mypocketdb.clux19hkotky.us-east-1.rds.amazonaws.com; Port=5432; Database=mypocketDB; Username=postgres; Password=*aP48104810;");

      return new MyPocketDBContext(optionsBuilder.Options);
    }
  }
  public class MyPocketDBContext : IdentityDbContext<User>
  {
    public MyPocketDBContext(DbContextOptions<MyPocketDBContext> options) : base(options)
    {
      Database.SetCommandTimeout(150000);
      //Database.EnsureCreated();
      //Database.Migrate();
    }
    public DbSet<Account> Accounts { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Budget> Budgets { get; set; }
    public DbSet<Transaction> Transactions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

      base.OnModelCreating(modelBuilder);

      modelBuilder.ApplyConfiguration(new UserConfiguration());
      modelBuilder.ApplyConfiguration(new AccountConfiguration());
      modelBuilder.ApplyConfiguration(new BudgetConfiguration());
      modelBuilder.ApplyConfiguration(new CategoryConfiguration());
      modelBuilder.ApplyConfiguration(new TransactionConfiguration());
      modelBuilder.ApplyConfiguration(new UserConfiguration());
    }
  }
  public class UserData
  {
    public string UserId { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
  }
  public static class IdentityExtensions
  {
    public static UserData GetUserData(this IIdentity identity)
    {
      var UserId = ((ClaimsIdentity)identity).FindFirst("UserID");
      var Name = ((ClaimsIdentity)identity).FindFirst("Name");
      var Email = ((ClaimsIdentity)identity).FindFirst("Email");
      var data = new UserData();
      data.UserId = UserId != null ? UserId.Value : string.Empty;
      data.UserName = Name != null ? Name.Value : string.Empty;
      data.Email = Email != null ? Email.Value : string.Empty;
      return data;
      // Test for null to avoid issues during local testing
    }
  }

}