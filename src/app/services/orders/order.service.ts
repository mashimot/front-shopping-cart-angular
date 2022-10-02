import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public API_URL = `${environment.apiUrlShoppingCart}/api/orders`;

  constructor(
    private http: HttpClient
  ) { }

  public getOrder() : Observable<any> {
    return this.http.get(`${this.API_URL}`);
  }

  public getOrderById(id: number) : Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  }
}
