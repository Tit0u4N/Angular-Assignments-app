import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Assignment, AssignmentComponent} from "./components/assignment/assignment.component";
import {assignmentMock} from "../shared/mocks";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatAccordion} from "@angular/material/expansion";
import {AssignmentListComponent} from "./components/assignment-list/assignment-list.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {AssignmentFormComponent} from "./components/assignment-form/assignment-form.component";

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
    MatButton
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private _bottomSheet = inject(MatBottomSheet);

  navOpen: boolean = false;
  title = 'assignment-app';
  assignments: Assignment[] = assignmentMock;

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  openNewAssignmentFormSheet() {
    const bottomSheetRef = this._bottomSheet.open(AssignmentFormComponent);
    bottomSheetRef.instance.assignmentEventEmitter.subscribe((assignment: Assignment) => {
      this.assignments.push(assignment);
    });
  }

  getTodoAssignments() {
    return this.assignments.filter(a => a.status === "todo");
  }

  getDoneAssignments() {
    return this.assignments.filter(a => a.status === "done");
  }

  getDelayedAssignments() {
    return this.assignments.filter(a => a.status === "delayed").sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
}
