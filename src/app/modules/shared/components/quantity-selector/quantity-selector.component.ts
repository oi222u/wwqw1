import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CartProduct } from 'src/app/modules/core/interfaces/cart-product-interface';

import { CartService } from 'src/app/modules/core/services/cart.service';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss'],
})
export class QuantitySelectorComponent {
  @Input() productId: number = 0;
  @Output() productAmountChange = new EventEmitter<number>();
  productAmount: number = 1;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.productAmount =
      this.cartService.findProduct(this.productId)?.amount ??
      this.productAmount;

    this.productAmountChange.subscribe(
      (amount) => (this.productAmount = amount)
    );
  }

  handleProductAmount(value: number) {
    const newAmount = this.productAmount + value;

    var cartProduct = {
      id: this.productId,
      amount: newAmount,
      totalPrice: 0,
    } as CartProduct;

    if (newAmount >= 1) {
      this.cartService.editProduct(cartProduct);
      this.productAmountChange.emit(newAmount);
    }
  }

  emitAmountChange() {
    this.productAmountChange.emit(this.productAmount);
  }
}
