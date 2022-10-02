import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public API_URL = `${environment.apiUrlShoppingCart}/api/carts`;

  constructor(
    private http: HttpClient
  ) { }
  

  public pay(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/pay`,
      data
    );
  }
}
