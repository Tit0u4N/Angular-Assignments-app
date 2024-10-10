import {Component, Input} from '@angular/core';
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
}
