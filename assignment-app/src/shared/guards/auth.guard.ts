import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateFn = async (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  const isAdmin = authService.isAdmin
  if (!isAdmin) {
    await router.navigate(['']);
  }

  return isAdmin;
};
