import {Component} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButton
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(public authService: AuthService) {}


}
