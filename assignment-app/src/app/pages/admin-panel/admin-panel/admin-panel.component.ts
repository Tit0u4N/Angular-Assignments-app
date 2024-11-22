import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AssignmentService} from "../../../../shared/services/assignment.service";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './admin-panel.component.html',
})
export class AdminPanelComponent {
  nbAssignmentToCreate: number = 100;

  constructor(private readonly assignmentService: AssignmentService) {
  }

  createAssignments() {
    if (this.nbAssignmentToCreate <= 0) {
      return;
    }
    if (this.nbAssignmentToCreate > 1000) {
      this.nbAssignmentToCreate = 1000;
    }
    this.assignmentService.createAssignments(this.nbAssignmentToCreate);
  }

  deleteAllAssignments() {
    this.assignmentService.deleteAllAssignments();
  }
}
