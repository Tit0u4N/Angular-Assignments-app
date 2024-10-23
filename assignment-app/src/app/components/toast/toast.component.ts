import { Component } from '@angular/core';
import {ToastService, ToastType} from "../../../shared/services/toast.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './toast.component.html',
})
export class ToastComponent {

  constructor(public toastService: ToastService) {
  }
}
