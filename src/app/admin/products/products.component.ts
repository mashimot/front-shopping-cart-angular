import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products$?: Observable<any>;
  
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  public create(){
    this.router.navigate(['admin', 'products', 'create']);
  }

  public update(productId: number){
    this.router.navigate(['admin', 'products', productId, 'edit']);
  }

  public delete(productId: number){
    this
      .productService
      .delete(productId)
      .subscribe(r => {
        if(r){
          this.getAll();
        }
      });
  }

  public getAll(){
    this.products$ = this.productService.getAll();
  }
}