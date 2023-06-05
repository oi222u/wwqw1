import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../interfaces/item-interface';
import { JwtTokenService } from '../../shared/services/jwt-token.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl?: string;

  constructor(
    private httpClient: HttpClient,
    private jwtTokenService: JwtTokenService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  getItemsByOrderId(id: number): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.apiUrl + '/Item/order/' + id);
  }

  addItem(item: Item): Observable<Item> {
    return this.httpClient.post<Item>(this.apiUrl + '/Item', item, {
      headers: this.jwtTokenService.getAuthHeader(),
    });
  }
}
