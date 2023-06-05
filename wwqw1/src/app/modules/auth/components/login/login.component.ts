import { Component } from '@angular/core';

import { Subject, catchError, of } from 'rxjs';

import { LoginService } from '../../services/login.service';
import { JwtTokenService } from './../../../shared/services/jwt-token.service';
import { User } from '../../interfaces/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  error$ = new Subject<boolean>();
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
  };

  constructor(
    private loginService: LoginService,
    private jwtTokenService: JwtTokenService,
    private router: Router
  ) {}

  login() {
    this.loginService
      .authenticateUser(this.user)
      .pipe(
        catchError((error) => {
          console.error(error);
          this.error$.next(true);
          return of();
        })
      )
      .subscribe((tokenObj) => {
        this.storeToken(tokenObj.token);
        window.location.reload();
        window.location.href = '/';
      });
  }

  storeToken(token: string) {
    this.jwtTokenService.setToken(token);
  }
}
