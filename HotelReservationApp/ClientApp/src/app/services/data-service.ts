import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReservationTable } from '../fetch-data/reservation';
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
}
