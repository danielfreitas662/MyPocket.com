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
      b.HasOne(e => e.Category)
          .WithMany(e => e.Budgets)
          .HasForeignKey(e => e.CategoryId)
          .IsRequired();
    }
  }
}