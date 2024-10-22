import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated: boolean = false;

  constructor() { }

  async login(login: string, password: string): Promise<string> {
    this._isAuthenticated = true;

    return "success";
  }

  logout() {
    this._isAuthenticated = false;
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  async isAdmin() : Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this._isAuthenticated);
      }, 500);
    });
  }
}
