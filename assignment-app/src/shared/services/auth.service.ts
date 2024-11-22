import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated: boolean = false;

constructor() { }
  async login(login: string, password: string): Promise<string> {
    this._isAuthenticated = true;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('token');
      }, 1000);
    });
  }

  async logout() : Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._isAuthenticated = false;
      resolve(false);
    });
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  get isAdmin(): boolean {
    return this._isAuthenticated;
  }
}
