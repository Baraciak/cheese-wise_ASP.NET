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
        //        public CheeseWiseDbContext()
        //        {
        //            AddSampleData();
        //        }

//        protected override void OnModelCreating(ModelBuilder modelBuilder)
//        {
//            modelBuilder.Entity<Company>()
//                .HasMany(c => c.Services)
//                .WithOne(c=>c.)
//                .OnDelete(DeleteBehavior.SetNull + -*);
//        }

        private void AddSampleData()
        {
            Users.AddRange(SampleData.Users);
            Accounts.AddRange(SampleData.Accounts);
            Categories.AddRange(SampleData.Categories);
            Companies.AddRange(SampleData.Companies);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        cheesewise:europe-west6:postgres
            => optionsBuilder.UseNpgsql("Host=34.65.219.173;Database=cheesewise;Username=postgres;Password=postgres");
    }
}
