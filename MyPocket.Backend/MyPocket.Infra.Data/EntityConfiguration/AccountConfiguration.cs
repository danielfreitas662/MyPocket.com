using Microsoft.EntityFrameworkCore;
using MyPocket.Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MyPocket.Infra.EntityConfiguration
{
  class AccountConfiguration : IEntityTypeConfiguration<Account>
  {
    public void Configure(EntityTypeBuilder<Account> b)
    {
      b.HasKey(c => c.Id);
      b.HasMany(e => e.Transactions)
          .WithOne(e => e.Account)
          .HasForeignKey(e => e.AccountId);
      b.HasOne(e => e.User)
      .WithMany(e => e.Accounts)
      .HasForeignKey(e => e.UserId)
      .IsRequired();
    }
  }
}