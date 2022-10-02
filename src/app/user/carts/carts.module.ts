import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartsRoutingModule } from './carts-routing.module';
import { CartsComponent } from './carts.component';
import { CartsFormComponent } from './carts-form/carts-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CartsComponent,
    CartsFormComponent
  ],
  imports: [
    CommonModule,
    CartsRoutingModule,
    ReactiveFormsModule
  ]
})
export class CartsModule { }
