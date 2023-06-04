import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-price-filter',
  templateUrl: './product-price-filter.component.html',
  styleUrls: ['./product-price-filter.component.scss'],
})
export class ProductPriceFilterComponent {
  valueRange: string = '';
  startValueRange: number = 0;
  endValueRange: number = 0;

  @Output() priceRangeChange = new EventEmitter<string>();

  formatLabel(value: number): string {
    return '$' + value;
  }

  onStartValueChange(event: any) {
    this.startValueRange = event;
    this.emitRangeValue();
  }

  onEndValueChange(event: any) {
    this.endValueRange = event;
    this.emitRangeValue();
  }

  emitRangeValue() {
    this.valueRange = String(this.startValueRange + '.' + this.endValueRange);
    this.priceRangeChange.emit(this.valueRange);
  }
}
