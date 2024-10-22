import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const guestGuard: CanActivateFn = async (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  const isLogged = authService.isAuthenticated
  if (isLogged) {
    await router.navigate(['']);
  }

  return !isLogged;
};
