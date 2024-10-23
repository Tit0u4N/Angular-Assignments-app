import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoaderService} from "./loader.service";
import {ToastService, ToastType} from "./toast.service";

type ExternalActionResponse<T> = {
  data: T,
  message: string,
  type: ToastType
}

export type AssignmentId = number | string;

export type AssignmentStatus = 'done' | 'todo' | 'delayed';

export type AssignmentData = {
  title: string,
  status: AssignmentStatus,
  date: Date | string,
  description?: string
}

export type Assignment = AssignmentData & {
  _id: AssignmentId
}

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private API_URL = 'http://localhost:8010/api/assignments';
  private assignmentsSubject = new BehaviorSubject<Assignment[]>([]);
  assignments$ = this.assignmentsSubject.asObservable();

  constructor(private http: HttpClient, private loaderService: LoaderService, private toastService: ToastService) {
    this.fetchAssignments();
  }

  private fetchAssignments() {
    return this.http.get<ExternalActionResponse<Assignment[]>>(this.API_URL).subscribe(res => {
      this.assignmentsSubject.next(res.data);
    });
  }

  getAssignmentByStatus(status: AssignmentStatus) {
    return this.assignmentsSubject.value.filter(assignment => assignment.status === status);
  }

  private handleChange<T>(observable: Observable<ExternalActionResponse<T>>) {
    this.loaderService.show();
    return observable.subscribe(res => {
      this.fetchAssignments().add(() => this.loaderService.hide());
      this.toastService.show(res.message, res.type);
    });
  }

  addAssignment(assignment: AssignmentData) {
    this.handleChange(this.http.post<ExternalActionResponse<Assignment>>(this.API_URL, assignment));
  }

  removeAssignment(assignmentToRemove: Assignment) {
    this.handleChange(this.http.delete<ExternalActionResponse<Assignment>>(`${this.API_URL}/${assignmentToRemove._id}`));
  }

  updateAssignment(assignment: Assignment) {
    this.handleChange(this.http.put<ExternalActionResponse<Assignment>>(`${this.API_URL}`, assignment));
  }

  setStatus(id: AssignmentId, status: AssignmentStatus) {
    const updatedAssignment = this.assignmentsSubject.value.find(assignment => assignment._id === id);
    if (updatedAssignment) {
      updatedAssignment.status = status;
      this.updateAssignment(updatedAssignment);
    }
  }
}
