
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';

import { StorePageComponent } from './components/store-page/store-page.component';

import { SharedModule } from '../shared/shared.module';
import { ProductModule } from './../product/product.module';

@NgModule({
  declarations: [StorePageComponent],
  imports: [CommonModule, StoreRoutingModule, SharedModule, ProductModule],
})
export class StoreModule {}
