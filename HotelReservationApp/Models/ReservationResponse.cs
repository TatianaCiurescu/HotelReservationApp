namespace HotelReservationApp.Models
{
    public class ReservationResponse
    {
        public int Total { get; set; }
        public IEnumerable<Reservation> Data { get; set; }
    }
}
