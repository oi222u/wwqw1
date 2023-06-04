import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { JwtTokenService } from 'src/app/modules/shared/services/jwt-token.service';
import { Store } from 'src/app/modules/store/interfaces/store-interface';
import { StoreService } from 'src/app/modules/store/services/store.service';

@Component({
  selector: 'app-product-inventory-listing',
  templateUrl: './product-inventory-listing.component.html',
  styleUrls: ['./product-inventory-listing.component.scss'],
})
export class ProductInventoryListingComponent implements OnInit {
  store?: Store;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jwtTokenService: JwtTokenService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    const userId = this.jwtTokenService.getAuthenticatedUserId();

    this.storeService.getStoreByUser(userId).subscribe((store) => {
      this.store = store;
      this.loadQueryParams();
    });
  }

  loadQueryParams() {
    this.route.paramMap
      .pipe(
        tap((params) => {
          if (params.keys.length == 0) {
            this.router.navigate([], {
              queryParams: { storeId: this.store!.id },
            });
          }
        })
      )
      .subscribe();
  }
}
