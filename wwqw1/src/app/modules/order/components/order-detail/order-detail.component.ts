import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { Item } from '../../interfaces/item-interface';
import { ItemService } from '../../services/item.service';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order-interface';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent {
  displayedColumns: string[] = ['Product', 'Price', 'Quantity', 'Total'];
  Items$?: Observable<Item[]>;
  Order?: Order;
  discount: number = 0;
  orderTotalPrice: number = 0;

  constructor(
    private itemService: ItemService,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const orderId = Number(params.get('id'));
        this.getOrderById(orderId);
        this.getItemsByOrderId(orderId);
      },
    });
  }

  getItemsByOrderId(id: number) {
    this.Items$ = this.itemService.getItemsByOrderId(id).pipe(
      tap((items) => {
        this.calculateOrderPrice(items);
      })
      );
  }

  getOrderById(id: number) {
    this.orderService.getOrderById(id).subscribe((order) => {
      this.Order = order;
    });
  }

  calculateOrderPrice(items: Item[]) {
    items.forEach(item => {
      this.orderTotalPrice += item.priceTotal;
    });
  }
}
