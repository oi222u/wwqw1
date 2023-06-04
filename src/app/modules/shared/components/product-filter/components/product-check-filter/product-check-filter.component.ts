import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Observable } from 'rxjs';

import { ProductCategory } from './../../../../../product/interfaces/product-category-interface';
import { ProductCategoryService } from 'src/app/modules/product/services/product-category.service';

@Component({
  selector: 'app-product-check-filter',
  templateUrl: './product-check-filter.component.html',
  styleUrls: ['./product-check-filter.component.scss'],
})
export class ProductCheckFilterComponent {
  @Input() titleName: string = 'Title';
  @Output() checkBoxChange = new EventEmitter<string>();

  productCategories$?: Observable<ProductCategory[]>;
  productCategoriesChecked: number[] = [];

  constructor(private productCategoryService: ProductCategoryService) {}

  ngOnInit() {
    this.getAllProductCategories();
  }

  getAllProductCategories() {
    this.productCategories$ =
      this.productCategoryService.getAllProductCategories();
  }

  onCheckBoxChange(event: any, categoryId: number) {
    const categoryIndex = this.productCategoriesChecked.findIndex(
      (c) => c === categoryId
    );

    if (event.checked) {
      this.productCategoriesChecked.push(categoryId);
    } else {
      this.productCategoriesChecked.splice(categoryIndex, 1);
    }

    this.emitCategories();
  }

  emitCategories() {
    this.checkBoxChange.emit(String(this.productCategoriesChecked));
  }
}
