import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {
  public products$?: Observable<any>;
  public product: any;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.products$ = this.getAll();
  }

  public addToCart(product: any){
    this.product = {...product};
  }

  public getAll(){
    return this.productService.getAll();
  }
}
