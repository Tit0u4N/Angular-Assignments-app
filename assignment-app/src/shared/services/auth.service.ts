import { Injectable } from '@angular/core';

const ADMIN_LOGIN = {
  login: 'admin',
  password: 'admin'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated: boolean = false;
  private _isAdmin: boolean = false;

constructor() { }
  async login(login: string, password: string): Promise<string> {
    this._isAuthenticated = true;
    if (login === ADMIN_LOGIN.login && password === ADMIN_LOGIN.password) {
      this._isAdmin = true;
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('token');
      }, 1000);
    });
  }

  async logout() : Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._isAuthenticated = false;
      this._isAdmin = false;
      window.location.href = '/'
      resolve(false);
    });
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }
}
