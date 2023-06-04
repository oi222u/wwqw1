import { Component } from '@angular/core';

import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs';
import { Order } from '../../interfaces/order-interface';
import { JwtTokenService } from 'src/app/modules/shared/services/jwt-token.service';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';

@Component({
  selector: 'app-order-listing',
  templateUrl: './order-listing.component.html',
  styleUrls: ['./order-listing.component.scss'],
})
export class OrderListingComponent {
  displayedColumns: string[] = ['id', 'date', 'status', 'order'];
  Orders$?: Observable<Order[]>;

  constructor(
    private OrderService: OrderService,
    private jwtTokenService: JwtTokenService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    const authUserId = this.jwtTokenService.getAuthenticatedUserId();
    this.customerService
      .getCustomerByUserId(authUserId)
      .subscribe((customer) => {
        this.Orders$ = this.OrderService.getOrdersByCustomerId(customer.id);
      });
  }
}
