import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../../shared/services/loader.service";

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

  constructor(public authService: AuthService, private router: Router, private loaderService: LoaderService) {}

  async onLogin() {
    this.loaderService.show();
    await this.authService.login(this.login, this.password);
    await this.router.navigate(['/']);
    this.loaderService.hide();
  }
}
