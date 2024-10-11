import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Assignment, AssignmentComponent} from "../assignment/assignment.component";

@Component({
  selector: 'app-assignment-list',
  standalone: true,
    imports: [
        AssignmentComponent
    ],
  templateUrl: './assignment-list.component.html',
})
export class AssignmentListComponent {
  @Input() assignments: Assignment[] = [];
  @Input() title: string = "Assignments";

  @Output() onDeletedEventEmitter : EventEmitter<Assignment> = new EventEmitter<Assignment>();

  deleteAssignment(assignment: Assignment) {
    this.onDeletedEventEmitter.emit(assignment);
  }
}
