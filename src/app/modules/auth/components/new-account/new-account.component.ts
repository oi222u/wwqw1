import { Component, OnInit } from '@angular/core';

import { User } from '../../interfaces/user-interface';
import { Store } from 'src/app/modules/store/interfaces/store-interface';
import { Customer } from 'src/app/modules/customer/interfaces/customer-interface';

import { LoginService } from '../../services/login.service';
import { StoreService } from 'src/app/modules/store/services/store.service';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { JwtTokenService } from 'src/app/modules/shared/services/jwt-token.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})
export class NewAccountComponent {
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
  };

  accountType: string = 'customer';
  storeDescription: string = ''; 

  constructor(
    private loginService: LoginService,
    private storeService: StoreService,
    private customerService: CustomerService,
    private jwtTokenService: JwtTokenService
  ) {}

  register() {
    this.loginService.addUser(this.user).subscribe(() => {
      this.login();
    });
  }

  createStore() {
    var store = {
      name: this.user.name,
      userId: this.jwtTokenService.getAuthenticatedUserId(),
      description: this.storeDescription,
    } as Store;

    this.storeService.addStore(store).subscribe();
  }

  createCustomer() {

    var customer = {
      name: this.user.name,
      userId: this.jwtTokenService.getAuthenticatedUserId(),
    } as Customer;

    this.customerService.addCustomer(customer).subscribe();
  }

  login() {
    this.loginService.authenticateUser(this.user).subscribe((tokenObj) => {
      this.storeToken(tokenObj.token);

      if (this.accountType == 'customer') this.createCustomer();
      else {
        this.createCustomer();
        this.createStore();
      }
    });
  }

  storeToken(token: string) {
    this.jwtTokenService.setToken(token);
  }
}
