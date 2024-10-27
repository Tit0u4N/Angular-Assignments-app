import {Component, Input, OnInit} from '@angular/core';
import { AssignmentComponent} from "../assignment/assignment.component";
import {Assignment, AssignmentService} from "../../../shared/services/assignment.service";

@Component({
  selector: 'app-assignment-list',
  standalone: true,
    imports: [
        AssignmentComponent
    ],
  templateUrl: './assignment-list.component.html',
})
export class AssignmentListComponent implements OnInit{
  @Input() title: string = "Assignments";
  @Input() assignmentStatus: 'done' | 'todo' | 'delayed' | 'all' = 'all';
  assignments: Assignment[] = [];

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit() {
    this.assignmentService.assignments$.subscribe(() => {
      this.assignments = this.assignmentService.getAssignment({status : this.assignmentStatus});
    });
  }
}
