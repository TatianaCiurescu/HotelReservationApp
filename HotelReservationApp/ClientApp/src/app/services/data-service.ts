import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../fetch-data/contact';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serviceUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  fetchPosts(): Observable<Contact[]> {
    return this.http.get<Object[]>(this.serviceUrl).pipe(
      map(data => data.map(o => this.toContact(o)))
    );
  }

  private toContact(obj: any): Contact {
    console.log(obj);
    const address = obj.address;
    return {
      phone: obj.phone,
      name: obj.name,
      email: obj.email,
      website: obj.website,
      address: address.street + ', ' + address.suite + ', ' + address.zipcode + ', ' + address.city
    };
  }
}
