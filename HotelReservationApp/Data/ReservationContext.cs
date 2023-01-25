using HotelReservationApp.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelReservationApp.Data
{
    public class ReservationContext: DbContext
    {
        public ReservationContext(DbContextOptions<ReservationContext> options): base(options) 
        {
        }

        public DbSet<Reservation> Reservations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Reservation>().ToTable("Reservation");
        }
    }
}
