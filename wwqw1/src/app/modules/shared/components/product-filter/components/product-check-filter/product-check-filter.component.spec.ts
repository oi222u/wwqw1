import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCheckFilterComponent } from './product-check-filter.component';

describe('ProductCheckFilterComponent', () => {
  let component: ProductCheckFilterComponent;
  let fixture: ComponentFixture<ProductCheckFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCheckFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCheckFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
