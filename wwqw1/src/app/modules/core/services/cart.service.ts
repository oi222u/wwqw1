import { Injectable } from '@angular/core';
import { CartProduct } from '../interfaces/cart-product-interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart';
  private cartUpdateSubject = new Subject<CartProduct[]>();
  constructor() {}

  getCart(): CartProduct[] {
    let cart: CartProduct[] = [];
    const cartStr = localStorage.getItem(this.cartKey);
    if (cartStr != null) {
      cart = JSON.parse(cartStr);

      if (cartStr == '') {
        cart.push(JSON.parse(cartStr));
      }
      return cart;
    }
    return [];
  }

  addProduct(cartProduct: CartProduct) {
    let newCart: CartProduct[];
    newCart = this.getCart();

    const productIndex = newCart.findIndex((p) => p.id == cartProduct.id);
    if (productIndex !== -1) {
      newCart[productIndex].amount++;
    } else {
      newCart.push(cartProduct);
    }
    localStorage.setItem(this.cartKey, JSON.stringify(newCart));
    this.cartUpdateSubject.next(newCart);
  }

  findProduct(productId: number): CartProduct | undefined {
    const productIndex = this.getCart().findIndex((p) => p.id === productId);
    return this.getCart().at(productIndex);
  }

  editProduct(cartProduct: CartProduct): CartProduct[] {
    let newCart = this.getCart();
    const productIndex = this.getCart().findIndex((p) => p.id === cartProduct.id);
    newCart[productIndex].amount = cartProduct.amount;
    newCart[productIndex].totalPrice = cartProduct.totalPrice;
    localStorage.setItem(this.cartKey, JSON.stringify(newCart));

    return newCart;
  }

  deleteProduct(productId: number): CartProduct[] {
    let newCart = this.getCart();
    const productIndex = this.getCart().findIndex((p) => p.id === productId);
    newCart.splice(productIndex, 1);
    console.log();
    localStorage.setItem(this.cartKey, JSON.stringify(newCart));

    this.cartUpdateSubject.next(newCart);

    return newCart;
  }

  cartUpdates(): Observable<CartProduct[]> {
    return this.cartUpdateSubject.asObservable();
  }
}
