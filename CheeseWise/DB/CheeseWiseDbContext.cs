using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CheeseWise.Models;
using Microsoft.EntityFrameworkCore;

namespace CheeseWise.DB
{
    public class CheeseWiseDbContext : DbContext
    {


        public DbSet<Category> Categories { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Account> Accounts { get; set; }

        public CheeseWiseDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        public CheeseWiseDbContext()
        {
            AddSampleData();
        }

        private void AddSampleData()
        {
            Categories.AddRange(SampleData.Categories);
            Users.AddRange(SampleData.Users);
            Companies.AddRange(SampleData.Companies);
            Services.AddRange(SampleData.Services);
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=localhost;Database=CheeseWiseDB;Username=postgres;Password=postgres");
    }
}
