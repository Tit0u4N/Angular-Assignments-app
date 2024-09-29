import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Assignment, AssignmentComponent} from "./components/assignment/assignment.component";
import {assignmentMock} from "../shared/mocks";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatDrawerContainer} from "@angular/material/sidenav";
import {HeaderComponent} from "./components/header/header.component";
import {AssigmentFormComponent} from "./components/assigment-form/assigment-form.component";




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AssignmentComponent, MatToolbarModule, MatIcon, MatIconButton, MatDrawerContainer, HeaderComponent, AssigmentFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'assignment-app';
  assignments : Assignment[] = assignmentMock;

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
