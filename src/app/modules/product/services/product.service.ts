import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product-interface';
import { JwtTokenService } from './../../shared/services/jwt-token.service';
import { PagedResponse } from '../../shared/interfaces/wrappers/paged-response-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl?: string;

  constructor(
    private httpClient: HttpClient,
    private jwtTokenService: JwtTokenService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.apiUrl + '/Product/' + id, {
      headers: this.jwtTokenService.getAuthHeader(),
    });
  }

  searchProduct(query: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      this.apiUrl + '/Product/search/' + query, {headers: this.jwtTokenService.getAuthHeader()}
    );
  }

  filterProductsByParams(params: HttpParams): Observable<PagedResponse<Product[]>> {
    return this.httpClient.get<PagedResponse<Product[]>>(this.apiUrl + '/Product/filter/', {
      params: params, headers: this.jwtTokenService.getAuthHeader(),
    });
  }

  filterProductsByIdList(params: HttpParams): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl + '/Product/idList', {
      params: params
    });
  }

  addProduct(newProduct: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl + '/Product', newProduct, {
      headers: this.jwtTokenService.getAuthHeader(),
    })
  }

  updateProduct(newProduct: Product, id: number): Observable<Product> {
    return this.httpClient.put<Product>(this.apiUrl + '/Product/' + id, newProduct, {
      headers: this.jwtTokenService.getAuthHeader(),
    })
  }
}
