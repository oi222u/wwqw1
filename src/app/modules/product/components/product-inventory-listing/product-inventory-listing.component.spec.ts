import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInventoryListingComponent } from './product-inventory-listing.component';

describe('ProductInventoryListingComponent', () => {
  let component: ProductInventoryListingComponent;
  let fixture: ComponentFixture<ProductInventoryListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInventoryListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInventoryListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
