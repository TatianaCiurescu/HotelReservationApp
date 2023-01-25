using HotelReservationApp.Models;

namespace HotelReservationApp.Repos
{
    public interface IReservationRepository
    {
        Task<ReservationResponse> GetPaginated(int pageSize, int pageNumber);
        Reservation Add(Reservation newReservation);
        void Update(Reservation reservationToUpdate);
        void Delete(Reservation reservationToDelete);
    }
}
