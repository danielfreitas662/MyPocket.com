using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

using MyPocket.Domain.Models;
using MyPocket.Infra.EntityConfiguration;

namespace ElevarGestao.Infra.Data.Context
{
  public class BloggingContextFactory : IDesignTimeDbContextFactory<MyPocketDBContext>
  {
    public MyPocketDBContext CreateDbContext(string[] args)
    {
      var optionsBuilder = new DbContextOptionsBuilder<MyPocketDBContext>();
      optionsBuilder.UseNpgsql("Host=localhost; Database=mypocketDB; Username=postgres; Password=daniel2;");

      return new MyPocketDBContext(optionsBuilder.Options);
    }
  }
  public class MyPocketDBContext : IdentityDbContext<User>
  {
    public MyPocketDBContext(DbContextOptions<MyPocketDBContext> options) : base(options)
    {
      Database.SetCommandTimeout(150000);
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

}