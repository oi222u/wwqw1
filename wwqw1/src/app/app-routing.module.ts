import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomPreloading } from './modules/core/services/custom-preloading.service';

import { HomeComponent } from './modules/core/components/home/home.component';
import { CartComponent } from './modules/core/components/cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },

  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    data: { preload: true, delay: 2000 },
  },

  {
    path: 'product',
    loadChildren: () =>
      import('./modules/product/product.module').then((m) => m.ProductModule),
    data: { preload: true, delay: 3000 },
  },

  {
    path: 'order',
    loadChildren: () =>
      import('./modules/order/order.module').then((m) => m.OrderModule),
    data: { preload: true, delay: 10000 },
  },

  {
    path: 'store',
    loadChildren: () =>
      import('./modules/store/store.module').then((m) => m.StoreModule),
    data: { preload: true, delay: 12000 },
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloading }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
