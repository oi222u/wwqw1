import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() inputType: string = '';
  @Input() placeholder: string = '';
  @Input() hasIconLeft: boolean = false;

  @Output() newTypedValue = new EventEmitter<string>();

  emitInputValue(value: string) {
    this.newTypedValue.emit(value);
  }
}
