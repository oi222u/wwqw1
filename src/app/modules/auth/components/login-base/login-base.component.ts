import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login-base',
  templateUrl: './login-base.component.html',
  styleUrls: ['./login-base.component.scss']
})
export class LoginBaseComponent {

  constructor(private location: Location) {}

  navigateBack() {
    this.location.back();
  }
}
