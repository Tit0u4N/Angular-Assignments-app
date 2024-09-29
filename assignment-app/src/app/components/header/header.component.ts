import { Component } from '@angular/core';
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatDrawerContainer,
    MatIcon,
    MatIconButton,
    MatToolbar,
    MatButton,
    MatDrawer,
    RouterLinkActive,
    RouterLink,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showNav = false;

  toggleNav(force : boolean = !this.showNav) {
    this.showNav = force;
  }
}

