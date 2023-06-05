import { ItemService } from 'src/app/modules/order/services/item.service';
import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, Subject, catchError, of, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { ImageService } from 'src/app/modules/shared/services/image.service';
import { Product } from '../../interfaces/product-interface';
import { Image } from 'src/app/modules/shared/interfaces/image-interface';
import { CartProduct } from 'src/app/modules/core/interfaces/cart-product-interface';
import { CartService } from 'src/app/modules/core/services/cart.service';
import { Order } from 'src/app/modules/order/interfaces/order-interface';
import { JwtTokenService } from 'src/app/modules/shared/services/jwt-token.service';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { OrderService } from 'src/app/modules/order/services/order.service';
import { Item } from 'src/app/modules/order/interfaces/item-interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    nav: false,
    pullDrag: true,
    dots: true,
    navSpeed: 600,
    lazyLoad: true,
    responsive: {
      0: {
        items: 1,
      },
    },
  };

  product?: Product;
  product$?: Observable<Product>;
  images?: Image[];
  images$?: Observable<Image[]>;
  error$ = new Subject<boolean>();
  imagesProviderUrl?: string;

  constructor(
    private productService: ProductService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private jwtTokenService: JwtTokenService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.imagesProviderUrl = this.imageService.getImagesProviderUrl();

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        this.getProduct(Number(id));
        this.getImagesByProduct(Number(id));
      },
    });
  }

  getProduct(productId: number) {
    this.product$ = this.productService.getProduct(productId).pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        return of();
      }),
      tap((product) => {
        this.product = product;
      })
    );
  }

  getImagesByProduct(productId: number) {
    this.images$ = this.imageService.getImagesbyProduct(productId).pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        return of();
      })
    );
  }

  addProductToCart(productId: number) {
    const product: CartProduct = {
      id: productId,
      amount: 1,
      totalPrice: 0,
    };

    this.cartService.addProduct(product);
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

  addItemToOrder(orderId: number) {
    var item = {
      orderId: orderId,
      productId: this.product?.id,
      priceTotal: this.product?.price,
      quantity: 1,
    } as Item;

    this.addOrderItem(item);
  }

  buySingleProduct() {
    this.addOrder().subscribe((order) => {
      this.addItemToOrder(order.id);
    });
  }
}
