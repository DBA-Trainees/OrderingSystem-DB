using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace OrderingSystem.EntityFrameworkCore
{
    public static class OrderingSystemDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<OrderingSystemDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<OrderingSystemDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
