import { Component } from '@angular/core';

import { Observable, switchMap, tap } from 'rxjs';

import { Product } from 'src/app/modules/product/interfaces/product-interface';
import { Image } from 'src/app/modules/shared/interfaces/image-interface';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { ImageService } from 'src/app/modules/shared/services/image.service';
import { CartService } from '../../services/cart.service';
import { HttpParams } from '@angular/common/http';
import { OrderService } from 'src/app/modules/order/services/order.service';
import { Order } from 'src/app/modules/order/interfaces/order-interface';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { JwtTokenService } from 'src/app/modules/shared/services/jwt-token.service';
import { Item } from 'src/app/modules/order/interfaces/item-interface';
import { ItemService } from 'src/app/modules/order/services/item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  products$?: Observable<Product[]>;
  products: Product[] = [];
  images: Image[] = [];
  image$?: Observable<Image>;
  imagesProviderUrl?: string;
  queryParams: HttpParams = new HttpParams();
  basePrice: number = 0;
  totalPrice: number = 0;
  discount: number = 0.0;
  cartItemsCount: number = 0;

  constructor(
    private productService: ProductService,
    private imageService: ImageService,
    private cartService: CartService,
    private orderService: OrderService,
    private jwtTokenService: JwtTokenService,
    private customerService: CustomerService,
    private itemService: ItemService
  ) {
    this.imagesProviderUrl = this.imageService.getImagesProviderUrl();
  }

  ngOnInit(): void {
    this.loadQueryParams();
  }

  loadQueryParams() {
    this.queryParams = new HttpParams();
    const cart = this.cartService.getCart();
    this.cartItemsCount = cart.length;
    cart.forEach((productCart) => {
      this.queryParams = this.queryParams.append('proId', productCart.id);
    });

    this.filterProducts(this.queryParams);
  }

  filterProducts(params: HttpParams) {
    this.products$ = this.productService.filterProductsByIdList(params).pipe(
      tap((products) => {
        this.getImagesByParams(params);
        this.products = products;
        this.calculateTotalPrice();
      })
    );
  }

  getImagesByParams(params: HttpParams) {
    this.imageService.getImagesByProductParams(params).subscribe((images) => {
      this.images = images;
    });
  }

  deleteProduct(productId: number) {
    this.cartService.deleteProduct(productId);
    this.loadQueryParams();
  }

  calculateTotalPrice() {
    const cart = this.cartService.getCart();
    this.basePrice = 0;

    cart.forEach((cartProduct) => {
      const productIndex = this.products.findIndex(
        (p) => p.id === cartProduct.id
      );
      cartProduct.totalPrice = this.products[productIndex].price * cartProduct.amount;
      this.cartService.editProduct(cartProduct);
      
      this.basePrice += cartProduct.totalPrice;
    });

    this.totalPrice = this.basePrice - this.discount;
  }

  addOrder(): Observable<Order> {
    const userId = this.jwtTokenService.getAuthenticatedUserId();

    return this.customerService.getCustomerByUserId(userId).pipe(
      switchMap((customer) => {
        const newOrder = {
          customerId: customer.id,
        } as Order;

        return this.orderService.addOrder(newOrder);
      })
    );
  }

  addOrderItem(item: Item) {
    this.itemService.addItem(item).subscribe();
  }

  addCartItemsToOrder(orderId: number) {
    const cart = this.cartService.getCart();

    cart.forEach((cartProduct) => {
      var item = {
        orderId: orderId,
        productId: cartProduct.id,
        priceTotal: cartProduct.totalPrice,
        quantity: cartProduct.amount,
      } as Item;

      this.addOrderItem(item);
    });
  }

  checkout() {
    this.addOrder().subscribe((order) => {
      this.addCartItemsToOrder(order.id);
    });
  }
}
