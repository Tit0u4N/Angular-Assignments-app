import { Injectable } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _isShown = false;
  private _type: ToastType = 'info';
  private _message: string = '';

  show(message: string, type: ToastType = 'info', duration: number = 3000) {
    this._isShown = true;
    this._message = message;
    this._type = type;

    setTimeout(() => {
      this._isShown = false;
    }, duration);
  }

  get isShown() {
    return this._isShown;
  }

  get message() {
    return this._message;
  }

  get type() {
    return this._type;
  }
}
