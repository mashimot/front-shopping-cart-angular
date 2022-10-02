import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  public API_URL = `${environment.apiUrlShoppingCart}/api/order_items`;

  constructor(
    private http: HttpClient
  ) { }

  public getOrderItems() : Observable<any> {
    return this.http.get(`${this.API_URL}`);
  }
}
