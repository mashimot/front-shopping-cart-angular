import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'products',
        loadChildren: () => import('./admin/products/products.module').then(m => m.ProductsModule)
      }  
    ],
  }, 
  {
    path: 'user',
    children: [
      {
        path: 'carts',
        loadChildren: () => import('./user/carts/carts.module').then(m => m.CartsModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./user/orders/orders.module').then(m => m.OrdersModule)
      }
    ],
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
