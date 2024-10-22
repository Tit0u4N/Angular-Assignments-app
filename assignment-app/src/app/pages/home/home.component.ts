import {Component} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private authService: AuthService) {}


}
