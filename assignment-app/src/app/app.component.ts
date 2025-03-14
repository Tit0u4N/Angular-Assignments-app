import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AssignmentComponent} from "./components/assignment/assignment.component";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatAccordion} from "@angular/material/expansion";
import {AssignmentListComponent} from "./components/assignment-list/assignment-list.component";
import {AssignmentFormComponent} from "./components/assignment-form/assignment-form.component";
import {AuthService} from "../shared/services/auth.service";
import {LoaderComponent} from "./components/loader/loader.component";
import {ToastComponent} from "./components/toast/toast.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AssignmentComponent,
    MatToolbarModule,
    MatIcon,
    MatIconButton,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    AssignmentFormComponent,
    MatAccordion,
    RouterLink,
    RouterLinkActive,
    MatDrawer,
    AssignmentListComponent,
    MatButton,
    LoaderComponent,
    ToastComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public readonly authService: AuthService) {
  }

  navOpen: boolean = false;
  title = 'assignment-app';

  toggleNav(force?: boolean) {
    this.navOpen = force !== undefined ? force : !this.navOpen;
  }

  async logout() {
    await this.authService.logout()
  }
}
