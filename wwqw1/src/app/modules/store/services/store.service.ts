import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Store } from '../interfaces/store-interface';
import { environment } from 'src/environments/environment';
import { JwtTokenService } from '../../shared/services/jwt-token.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiUrl?: string;

  constructor(
    private httpClient: HttpClient,
    private jwtTokenService: JwtTokenService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  getStore(id: number): Observable<Store> {
    return this.httpClient.get<Store>(this.apiUrl + '/Store/' + id);
  }

  getStoreByUser(userId: number): Observable<Store> {
    return this.httpClient.get<Store>(this.apiUrl + '/Store/user/' + userId);
  }

  addStore(store: Store): Observable<Store> {
    return this.httpClient.post<Store>(this.apiUrl + '/Store', store, {
      headers: this.jwtTokenService.getAuthHeader(),
    });
  }
}
