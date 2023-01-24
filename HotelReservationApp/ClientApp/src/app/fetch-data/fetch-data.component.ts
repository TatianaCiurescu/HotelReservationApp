import { Component } from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../services/data-service';
import { Contact } from './contact';

@Component({
  selector: 'app-fetch-data',
  styleUrls: ['fetch-data.css'],
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
    displayedColumns: string[] = ['phone', 'name', 'email', 'website', 'address'];
    dataSource: MatTableDataSource<Contact>;

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.fetchPosts().subscribe(contacts => {
            this.dataSource = new MatTableDataSource(contacts);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });
    }
}



