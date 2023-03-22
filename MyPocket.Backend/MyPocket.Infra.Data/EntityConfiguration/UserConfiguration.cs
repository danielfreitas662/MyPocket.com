using Microsoft.EntityFrameworkCore;
using MyPocket.Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MyPocket.Infra.EntityConfiguration
{
  class UserConfiguration : IEntityTypeConfiguration<User>
  {
    public void Configure(EntityTypeBuilder<User> b)
    {
      b.HasKey(c => c.Id);
      b.HasMany(e => e.Transactions)
          .WithOne(e => e.User)
          .HasForeignKey(e => e.UserId)
          .IsRequired();
    }
  }
}