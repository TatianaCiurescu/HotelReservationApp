import { Component } from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../services/data-service';
import { Reservation, ReservationTable } from './reservation';

import { merge, Observable, of as observableOf, pipe } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-fetch-data',
  styleUrls: ['fetch-data.css'],
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'LastName', 'FirstName', 'Cnp', 'Phone', 'RoomNo', 'CheckIn', 'CheckOut'];

    reservationTable: ReservationTable;
    totalData: number;

    ReservationData: Reservation[];

  dataSource = new MatTableDataSource<Reservation>();

  isLoading = false;

  @ViewChild('paginator') paginator: MatPaginator;

    constructor(private dataService: DataService) { }

  getTableData$(pageNumber: Number, pageSize: Number) {
    return this.dataService.getReservations(pageNumber, pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.getTableData$(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((reservationData) => {
          if (reservationData == null) return [];
          this.totalData = reservationData.total;
          this.isLoading = false;
          return reservationData.data;
        })
      )
      .subscribe((reservationData) => {
        this.ReservationData = reservationData;
        this.dataSource = new MatTableDataSource(this.ReservationData);
      });
  }

  ngOnInit(): void { }
}



