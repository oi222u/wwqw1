import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, catchError, tap, map, of } from 'rxjs';

import { Product } from '../../interfaces/product-interface';
import { Image } from 'src/app/modules/shared/interfaces/image-interface';
import { ProductService } from '../../services/product.service';
import { ImageService } from 'src/app/modules/shared/services/image.service';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ProductCategory } from '../../interfaces/product-category-interface';
import { ProductCategoryService } from '../../services/product-category.service';
import { JwtTokenService } from 'src/app/modules/shared/services/jwt-token.service';
import { StoreService } from 'src/app/modules/store/services/store.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent {
  @ViewChild('owlCar', { static: false }) owlCar?: any;

  newProduct: boolean = false;
  product$?: Observable<Product>;
  product: Product = {
    id: 0,
    name: '',
    description: '',
    largeImageUrl: '',
    smallImageUrl: '',
    price: 0,
    storeId: 0,
    productCategoryId: 0,
  };
  images: Image[] = [];
  images$?: Observable<Image[]>;
  error$ = new Subject<boolean>();
  imagesProviderUrl: string;
  imageFileName: string = '';
  productCategories$?: Observable<ProductCategory[]>;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private productCategoryService: ProductCategoryService,
    private jwtTokenService: JwtTokenService,
    private storeService: StoreService
  ) {
    this.imagesProviderUrl = this.imageService.getImagesProviderUrl();
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    nav: false,
    pullDrag: true,
    dots: true,
    navSpeed: 600,
    responsive: {
      0: {
        items: 1,
      },
      650: {
        items: 2,
      },
    },
  };

  ngOnInit() {
    this.route.paramMap
      .pipe(
        tap((params) => {
          const id = params.get('id');
          if (id) {
            this.getProduct(Number(id));
            this.getImagesByProduct(Number(id));
          } else this.newProduct = true;
        })
      )
      .subscribe();

    this.getAllProductCategories();
    this.getUserStore();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    dialogMessage: string
  ): MatDialogRef<ConfirmationDialogComponent, any> {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: {
        message: dialogMessage,
      },
    });
  }

  RemoveImageDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    dialogMessage: string
  ): void {
    const dialogRef = this.openDialog(
      enterAnimationDuration,
      exitAnimationDuration,
      dialogMessage
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteImageById(
          this.images.at(this.owlCar.carouselService._current)!.id
        );
      }
    });
  }

  CancelChangesDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    dialogMessage: string
  ): void {
    const dialogRef = this.openDialog(
      enterAnimationDuration,
      exitAnimationDuration,
      dialogMessage
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // do something (later)
      }
    });
  }

  SaveChangesDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    dialogMessage: string   
  ): void {
    const dialogRef = this.openDialog(
      enterAnimationDuration,
      exitAnimationDuration,
      dialogMessage
    );
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.saveProductInfo();
      }
    });
  }

  getProduct(productId: number) {
    this.product$ = this.productService.getProduct(productId).pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        return of();
      }),
      tap((product) => (this.product = product))
    );
  }

  getImagesByProduct(productId: number) {
    this.images$ = this.imageService.getImagesbyProduct(productId).pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        return of();
      }),
      tap((images) => {
        this.images = images;
      })
    );
  }

  deleteImageById(imageId: number) {
    this.imageService
      .deleteImageById(imageId)
      .pipe(
        catchError((error) => {
          console.error(error);
          this.error$.next(true);
          return of();
        })
      )
      .subscribe(() => {
        this.getImagesByProduct(this.product!.id);
      });
  }

  uploadImage(event: any) {
    const imageFile: File = event.target.files[0];
    if (imageFile) {
      this.imageFileName = '-product' + imageFile.name;

      const formData = new FormData();
      var imageModel = {
        name: this.imageFileName,
        productId: this.product!.id,
      } as Image;

      formData.append('imageFile', imageFile, this.imageFileName);
      formData.append('json', JSON.stringify(imageModel));

      this.imageService.uploadImageFile(formData).subscribe(() => {
        this.getImagesByProduct(this.product!.id);
      });
    }
  }

  getAllProductCategories() {
    this.productCategories$ =
      this.productCategoryService.getAllProductCategories();
  }

  saveProductInfo() {
    if (this.newProduct)
      this.product$ = this.productService.addProduct(this.product);
    else
      this.product$ = this.productService.updateProduct(
        this.product,
        this.product.id
      );
  }

  getUserStore() {
    const userId = this.jwtTokenService.getAuthenticatedUserId();
    this.storeService.getStoreByUser(userId).subscribe((store) => {
      this.product.storeId = store.id;
    })
  }
}
