import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AssignmentService} from "../../../shared/services/assignment.service";
import {LoggingService} from "../../../shared/services/logging.service";
import {formatDateTimeLog} from "../../../shared/utils";
import {NgClass} from "@angular/common";
import {MatSlideToggle} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    MatSlideToggle
  ],
  templateUrl: './admin-panel.component.html',
})
export class AdminPanelComponent {
  nbAssignmentToCreate: number = 100;

  constructor(private readonly assignmentService: AssignmentService, public loggingService: LoggingService) {
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

  protected readonly formatDateTimeLog = formatDateTimeLog;
}
