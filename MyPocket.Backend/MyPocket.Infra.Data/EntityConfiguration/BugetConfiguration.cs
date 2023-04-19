using Microsoft.EntityFrameworkCore;
using MyPocket.Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MyPocket.Infra.EntityConfiguration
{
  class BudgetConfiguration : IEntityTypeConfiguration<Budget>
  {
    public void Configure(EntityTypeBuilder<Budget> b)
    {
      b.HasKey(c => c.Id);
      b.HasMany(e => e.Items)
          .WithOne(e => e.Budget)
          .HasForeignKey(e => e.BudgetId)
          .IsRequired();
    }
  }
}