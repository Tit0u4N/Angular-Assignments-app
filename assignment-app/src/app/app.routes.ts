import { Routes } from '@angular/router';
import {AssignmentListingPageComponent} from "./pages/assignment-listing-page/assignment-listing-page.component";
import {AssignmentFormPageComponent} from "./pages/assignment-form-page/assignment-form-page.component";

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: AssignmentListingPageComponent },
  { path: 'new-assignment', component: AssignmentFormPageComponent },
];
