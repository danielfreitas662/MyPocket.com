using Microsoft.EntityFrameworkCore;
using MyPocket.Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MyPocket.Infra.EntityConfiguration
{
  class BudgetItemConfiguration : IEntityTypeConfiguration<BudgetItem>
  {
    public void Configure(EntityTypeBuilder<BudgetItem> b)
    {
      b.HasKey(c => c.Id);
      b.HasOne(e => e.Category)
          .WithMany(e => e.BudgetItems)
          .HasForeignKey(e => e.CategoryId)
          .IsRequired();
      b.HasOne(e => e.Budget)
      .WithMany(e => e.Items)
      .HasForeignKey(e => e.BudgetId)
      .IsRequired();
    }
  }
}