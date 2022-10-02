import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  public API_URL = `${environment.apiUrlShoppingCart}/api/addresses`;

  constructor(
    private http: HttpClient
  ) { }

  public getAddresses() : Observable<any> {
    return this.http.get(this.API_URL);
  }
}
