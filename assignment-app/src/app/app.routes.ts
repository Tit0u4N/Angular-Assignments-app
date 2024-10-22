import { Routes } from '@angular/router';
import {AssignmentListingPageComponent} from "./pages/assignment-listing-page/assignment-listing-page.component";
import {AssignmentFormPageComponent} from "./pages/assignment-form-page/assignment-form-page.component";
import { authGuard} from "../shared/services/auth.guard";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent, canDeactivate: [authGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'assignments', component: AssignmentListingPageComponent, canActivate: [authGuard] },
  { path: 'new-assignment', component: AssignmentFormPageComponent, canActivate: [authGuard] },
];
