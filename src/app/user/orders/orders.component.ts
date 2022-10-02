import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { OrderItemService } from 'src/app/services/order-items/order-item.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders$?: Observable<any>;
  order_id?: any = 0;

  constructor(
    private orderItemService: OrderItemService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.orders$ = this.route.paramMap
    .pipe(
      switchMap(paramMap => this.getUserOrdersDetails()
        .pipe(
          tap(userOrders => this.order_id = paramMap.get('id') || 0)
        )
      )
    );
  }

  public getUserOrdersDetails(){
    return this.orderItemService.getOrderItems();
  }

}
