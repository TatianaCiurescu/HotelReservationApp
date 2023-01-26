import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DataService } from '../../services/data-service';
import { Reservation } from '../reservation';


@Component({
  selector: 'delete',
  templateUrl: '../../booking/delete/delete.component.html',
  styleUrls: ['../../booking/delete/delete.component.css']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reservation, public dataService: DataService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.delete(this.data);

  }

  ngAfterViewInit() {
    console.log(this.data);
  }
}

