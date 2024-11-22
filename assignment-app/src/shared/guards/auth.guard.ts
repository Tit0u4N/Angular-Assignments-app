import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateFn = async (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  const isAuthed = authService.isAuthenticated
  if (!isAuthed) {
    await router.navigate(['login']);
  }

  return isAuthed;
};

export const adminGuard: CanActivateFn = async (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  const isAdmin = authService.isAdmin
  if (!isAdmin) {
    await router.navigate(['login']);
  }

  return isAdmin;
}
