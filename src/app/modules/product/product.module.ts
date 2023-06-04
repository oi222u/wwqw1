import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';

import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductFilterGroupComponent } from './components/product-filter-group/product-filter-group.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { ProductInventoryListingComponent } from './components/product-inventory-listing/product-inventory-listing.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

import { SharedModule } from '../shared/shared.module';

import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    ProductAddComponent,
    ProductDetailComponent,
    ProductFilterGroupComponent,
    ProductListingComponent,
    ProductInventoryListingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    SharedModule,
    CarouselModule,
    MatPaginatorModule,
  ],
  exports: [
    ProductListingComponent
  ]
})
export class ProductModule {}
