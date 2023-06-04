import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { Image } from 'src/app/modules/shared/interfaces/image-interface';
import { ImageService } from 'src/app/modules/shared/services/image.service';
import { Store } from 'src/app/modules/store/interfaces/store-interface';
import { StoreService } from 'src/app/modules/store/services/store.service';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.scss'],
})
export class StoreCardComponent {
  store$?: Observable<Store>;
  image$?: Observable<Image>;
  imagesProviderUrl?: string;
  @Input() storeId?: number;

  constructor(
    private storeService: StoreService,
    private imageService: ImageService,
    private route: ActivatedRoute
  ) {
    this.imagesProviderUrl = this.imageService.getImagesProviderUrl();
  }

  ngOnInit() {
    if (this.storeId) this.getStore(this.storeId);
    else {
      this.route.queryParamMap.subscribe((params) => {
        const storeId = Number(params.get('storeId'));
        this.getStore(storeId);
      });
    }
  }

  getStore(storeId: number) {
    this.store$ = this.storeService.getStore(storeId).pipe(
      tap((store) => {
        this.image$ = this.imageService.getImageByUser(store.userId);
      })
    );
  }
}
