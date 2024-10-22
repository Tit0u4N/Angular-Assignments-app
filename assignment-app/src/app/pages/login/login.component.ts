import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  login : string = '';
  password : string = '';

  constructor(public authService: AuthService, private router: Router) {}

  async onLogin() {
    await this.authService.login(this.login, this.password);
    await this.router.navigate(['/home']);
  }
}
