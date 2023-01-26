import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReservationTable, Reservation } from '../booking/reservation';
import { Inject } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http: HttpClient, @Inject('BASE_URL')private baseUrl: string) { }

  public getReservations(
    pageNumber: Number,
    pageSize: Number
  ): Observable<ReservationTable> {

    return this.http.get<ReservationTable>(this.baseUrl + 'reservation' + `?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  public add(data: Reservation) {
    this.http.post(this.baseUrl + 'reservation', data).subscribe();
  }

  public update(data: Reservation) {
    this.http.put(this.baseUrl + 'reservation', data).subscribe();
  }

  public delete(data: Reservation) {
    this.http.delete(this.baseUrl + 'reservation' + `?id=${data.id}`).subscribe();
  }
}


