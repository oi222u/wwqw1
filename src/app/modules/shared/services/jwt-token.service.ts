import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtTokenService {
  private jwtKey = 'jwt';

  constructor() {}

  getToken(): string | null {
    return localStorage.getItem(this.jwtKey);
  }

  getAuthenticatedUserId(): any {
    if (this.getToken() !== null) {
      let payload: any = jwtDecode(this.getToken()!);
      return payload['UserId'];
    }      
    return null;
  }

  setToken(token: string): void {
    localStorage.setItem(this.jwtKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.jwtKey);
  }

  getAuthHeader() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken(),
    });
  }
}
