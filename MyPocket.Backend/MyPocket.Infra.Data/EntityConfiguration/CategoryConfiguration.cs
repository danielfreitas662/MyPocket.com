using Microsoft.EntityFrameworkCore;
using MyPocket.Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MyPocket.Infra.EntityConfiguration
{
  class CategoryConfiguration : IEntityTypeConfiguration<Category>
  {
    public void Configure(EntityTypeBuilder<Category> b)
    {
      b.HasKey(c => c.Id);
      b.HasMany(e => e.Transactions)
          .WithOne(e => e.Category)
          .HasForeignKey(e => e.CategoryId)
          .IsRequired();
      b.HasMany(e => e.Budgets)
          .WithOne(e => e.Category)
          .HasForeignKey(e => e.CategoryId)
          .IsRequired();
    }
  }
}