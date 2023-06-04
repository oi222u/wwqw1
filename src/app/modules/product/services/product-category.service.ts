import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ProductCategory } from '../interfaces/product-category-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private apiUrl?: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getProductCategory(id: number): Observable<ProductCategory> {
    return this.httpClient.get<ProductCategory>(
      this.apiUrl + '/ProductCategory/' + id
    );
  }

  getAllProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(
      this.apiUrl + '/ProductCategory'
    );
  }
}
