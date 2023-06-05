import { Component } from '@angular/core';

import { ProductOrdinations } from 'src/app/modules/shared/models/product-ordinations-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly productOrdinations = ProductOrdinations;
}
