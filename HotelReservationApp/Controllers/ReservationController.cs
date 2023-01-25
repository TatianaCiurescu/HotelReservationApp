using HotelReservationApp.Models;
using HotelReservationApp.Repos;
using Microsoft.AspNetCore.Mvc;

namespace HotelReservationApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationRepository _reservationRepository;
        public ReservationController(IReservationRepository reservationRepository)
        {
            _reservationRepository= reservationRepository;  
        }

        [HttpGet]
        public async Task<ReservationResponse> Get([FromQuery]int pageNumber, [FromQuery] int pageSize)
        {
            
              var tableData = await _reservationRepository.GetPaginated(pageSize, pageNumber);

            return tableData;
        }

        [HttpPost]
        public IActionResult Post([FromBody]Reservation newReservation) 
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);  
            }
            var addedReservation = _reservationRepository.Add(newReservation);
            return CreatedAtAction("Get", new { id = addedReservation.Id, addedReservation });
        }

        [HttpPut]
        public IActionResult Put([FromBody]Reservation reservationToUpdate)
        {
            _reservationRepository.Update(reservationToUpdate);
            return Ok(reservationToUpdate);
        }

        [HttpDelete]
        public IActionResult Delete(Reservation reservationToDelete)
        {
            _reservationRepository.Delete(reservationToDelete);
            return Ok();   
        }
    }
}