using Microsoft.EntityFrameworkCore;
using MyPocket.Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MyPocket.Infra.EntityConfiguration
{
  class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
  {
    public void Configure(EntityTypeBuilder<Transaction> b)
    {
      b.HasKey(c => c.Id);
      b.HasOne(e => e.Category)
          .WithMany(e => e.Transactions)
          .HasForeignKey(e => e.CategoryId)
          .IsRequired();
      b.HasOne(e => e.Account)
          .WithMany(e => e.Transactions)
          .HasForeignKey(e => e.AccountId)
          .IsRequired();
      b.HasOne(e => e.User)
          .WithMany(e => e.Transactions)
          .HasForeignKey(e => e.UserId)
          .IsRequired();
    }
  }
}