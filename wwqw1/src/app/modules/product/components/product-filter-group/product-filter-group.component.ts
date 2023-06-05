import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-product-filter-group',
  templateUrl: './product-filter-group.component.html',
  styleUrls: ['./product-filter-group.component.scss'],
})
export class ProductFilterGroupComponent {
  queryParams: HttpParams = new HttpParams();
  priceRange: string = '';
  productCategories: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  storePriceRange(event: any) {
    this.priceRange = event;
  }

  storeCategories(event: any) {
    this.productCategories = event;
  }

  applyFilters() {
    this.route.queryParams.pipe().subscribe((params) => {
      console.log(params);

      this.router.navigate([], {
        queryParams: { priceRange: this.priceRange, CategoriesId: this.productCategories },
        queryParamsHandling: 'merge',
      });
    });
  }
}
