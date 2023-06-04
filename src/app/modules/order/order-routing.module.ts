import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderListingComponent } from './components/order-listing/order-listing.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listing', component: OrderListingComponent },
      { path: 'detail/:id', component: OrderDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
