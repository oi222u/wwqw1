import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Order } from './../interfaces/order-interface';
import { JwtTokenService } from '../../shared/services/jwt-token.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl?: string;

  constructor(
    private httpClient: HttpClient,
    private jwtTokenService: JwtTokenService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  getOrderById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(this.apiUrl + '/Order/' + id);
  }

  getOrdersByCustomerId(id: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.apiUrl + '/Order/customer/' + id);
  }

  addOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.apiUrl + '/Order', order, {
      headers: this.jwtTokenService.getAuthHeader(),
    });
  }
}
