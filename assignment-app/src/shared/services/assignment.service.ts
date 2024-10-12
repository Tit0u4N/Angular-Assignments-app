import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {assignmentMock} from "../mocks";

export type AssignmentStatus = 'done' | 'todo' | 'delayed';

export type AssignmentData = {
  title: string,
  status: AssignmentStatus,
  date: Date,
  description?: string
}

export type Assignment  = AssignmentData & {
  id: number,
}

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private assignmentsSubject = new BehaviorSubject<Assignment[]>(assignmentMock);
  assignments$ = this.assignmentsSubject.asObservable();
  private assignmentsIdCpt: number = this.assignmentsSubject.value
    .map((a) => a.id)
    .reduce((maxId, id) => Math.max(maxId, id))

  constructor() {
  }

  getAssignments() {
    return this.assignmentsSubject.value;
  }

  getAssignmentByStatus(status: AssignmentStatus) {
    return this.assignmentsSubject.value.filter(assignment => assignment.status === status);
  }

  addAssignment(assignment: AssignmentData) {
    const currentAssignments = this.assignmentsSubject.value;
    this.assignmentsSubject.next([...currentAssignments, {id : this.assignmentsIdCpt++, ...assignment}]);
  }

  removeAssignment(assignmentToRemove: Assignment) {
    const updatedAssignments = this.assignmentsSubject.value.filter(
      assignment => assignment !== assignmentToRemove
    );
    this.assignmentsSubject.next(updatedAssignments);
  }

  setStatus(id: number, status: AssignmentStatus) {
    const updatedAssignments = this.assignmentsSubject.value.map(
      assignment => {
        if (assignment.id === id) {
          assignment.status = status;
        }
        return assignment;
      }
    );
    this.assignmentsSubject.next(updatedAssignments)
  }
}
