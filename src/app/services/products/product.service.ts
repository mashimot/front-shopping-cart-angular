import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public API_URL = `${environment.apiUrlShoppingCart}/api/products`;

  constructor(
    private http: HttpClient
  ) { }

  public getAll() : Observable<any> {
    return this.http.get(this.API_URL);
  }

  public show(productId: number){
    return this.http.get(`${this.API_URL}/${productId}`);
  }

  public store(data: any) : Observable<any> {
    return this.http.post(this.API_URL, data);
  }

  public update(data: any, id: any) : Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }
  
  public delete(productId: number) : Observable<any> {
    return this.http.delete(`${this.API_URL}/${productId}`);
  }
}
