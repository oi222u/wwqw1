import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterGroupComponent } from './product-filter-group.component';

describe('ProductFilterGroupComponent', () => {
  let component: ProductFilterGroupComponent;
  let fixture: ComponentFixture<ProductFilterGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFilterGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFilterGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
