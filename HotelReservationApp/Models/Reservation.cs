using System.ComponentModel.DataAnnotations;

namespace HotelReservationApp.Models
{
    public class Reservation
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MinLength(4)]
        public string FirstName { get; set; }
        [Required]
        [MinLength(4)]
        public string LastName { get; set; }
        
        [Required]
        [MinLength(13, ErrorMessage ="Cnp-ul nu poate avea mai putin de 13 cifre.")]
        [MaxLength(13, ErrorMessage = "Cnp-ul nu poate avea mai mult de 13 cifre.")]
        public string Cnp { get; set; }

        [Phone]
        public int Phone { get; set; }
        public int RoomNo { get; set; }
       
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }   
    }
}
