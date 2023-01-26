import { Component } from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../services/data-service';
import { Reservation, ReservationTable } from './reservation';
import { AddDialogComponent } from './add/add.component';

import { Observable, of as observableOf} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DeleteDialogComponent } from './delete/delete.component';
import { EditDialogComponent } from './edit/edit.component';

@Component({
  selector: 'app-booking',
  styleUrls: ['booking.component.css'],
  templateUrl: './booking.component.html'
})
export class BookingComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'LastName', 'FirstName', 'Cnp', 'Phone', 'RoomNo', 'CheckIn', 'CheckOut', 'actions'];

    reservationTable: ReservationTable;
    totalData: number;

    ReservationData: Reservation[];

  dataSource = new MatTableDataSource<Reservation>();

  isLoading = false;

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private dataService: DataService, public dialogService: MatDialog) { }

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

  openAddDialog() {
    const dialogRef = this.dialogService.open(AddDialogComponent, {
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.ngAfterViewInit();
      }
    });
};

  startEdit(element: Reservation) {
    var data = element;
    const dialogRef = this.dialogService.open(EditDialogComponent, {
      data
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.ngAfterViewInit();
      }
    });
  };

  deleteItem(element: Reservation) {
    var data = element;
    const dialogRef = this.dialogService.open(DeleteDialogComponent, { data }); 
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.ngAfterViewInit();
      }
    });
};
}



