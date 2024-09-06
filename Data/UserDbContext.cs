using geniateq_task.Models;
using Microsoft.EntityFrameworkCore;

namespace geniateq_task.Data
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
    }
}
