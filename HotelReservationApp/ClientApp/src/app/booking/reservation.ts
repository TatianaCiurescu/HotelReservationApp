export interface Reservation {
  id: number,
  firstName: string,
  lastName: string,
  cnp: string,
  phone: number,
  roomNo: number,
  checkIn: Date,
  checkOut: Date
}

export interface ReservationTable
{
  data: Reservation[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
