import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export  const authGuard: CanActivateFn = async (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  const isAdmin = await authService.isAdmin()
  if (!isAdmin) {
    await router.navigate(['']);
  }

  return isAdmin;
};
