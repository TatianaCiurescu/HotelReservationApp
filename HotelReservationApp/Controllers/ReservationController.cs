using HotelReservationApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace HotelReservationApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReservationController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        [HttpGet]
        public ReservationResponse Get([FromQuery]int pageNumber, [FromQuery] int pageSize)
        {
            
              var tableData =  Enumerable.Range(1, 25).Select(index => new Reservation
            {
                CheckIn = DateTime.UtcNow,
                CheckOut = DateTime.UtcNow,
                Id = Random.Shared.Next(-20, 55),
                FirstName = Summaries[Random.Shared.Next(Summaries.Length)],
                LastName = Summaries[Random.Shared.Next(Summaries.Length)],
                Cnp = "1930726410045",
                Phone = Random.Shared.Next(-20, 55),
                RoomNo = Random.Shared.Next(-20, 55)
            })
            .ToArray();

            return new ReservationResponse { Data = tableData.Skip((pageNumber-1)*pageSize).Take(pageSize), Total = tableData.Length};
        }
    }
}