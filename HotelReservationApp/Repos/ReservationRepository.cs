
using HotelReservationApp.Data;
using HotelReservationApp.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelReservationApp.Repos
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly ReservationContext _context;
        public ReservationRepository(ReservationContext context)
        {
            _context= context;
        }

        public async Task<ReservationResponse> GetPaginated(int pageSize, int pageNumber)
        {
            var data = await _context.Reservations.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            var count = await _context.Reservations.CountAsync();

            return new ReservationResponse { Data=data, Total=count};
        }

        public Reservation Add(Reservation newReservation)
        {
            var addedReservation = _context.Reservations.Add(newReservation);
            _context.SaveChanges();
            return addedReservation.Entity;
        }

        public void Update(Reservation reservationToUpdate) 
        { 
            _context.Reservations.Update(reservationToUpdate);  
            _context.SaveChanges();
        }

        public void Delete(Reservation reservationToDelete) 
        {
            var deletedReservation = _context.Reservations.Remove(reservationToDelete);
            _context.SaveChanges();
        }


    }
}
