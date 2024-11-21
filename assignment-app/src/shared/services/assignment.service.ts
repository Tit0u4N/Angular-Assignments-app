import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoaderService} from "./loader.service";
import {ToastService, ToastType} from "./toast.service";
import {data} from "autoprefixer";
import {environment} from "../../environments/environment";

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

export type Meta = {
  totalDocs: number,
  limit: number,
  page: number,
  totalPages: number,
  pagingCounter: number,
  hasPrevPage: boolean,
  hasNextPage: boolean,
  prevPage?: null,
  nextPage?: null
}

const DEFAULT_META: Meta = {
  totalDocs: 0,
  limit: 0,
  page: 0,
  totalPages: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null
}

export type AssignmentAPIResponse = Meta & {
  docs: Assignment[],
}


@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private URL = environment.apiURL
  private END_POINT = `${this.URL}/assignments`;
  private assignmentsSubject = new BehaviorSubject<Assignment[]>([]);
  private metaSubject = new BehaviorSubject<Meta>(DEFAULT_META);
  assignments$ = this.assignmentsSubject.asObservable();
  meta$: Observable<Meta> = this.metaSubject.asObservable();

  constructor(private http: HttpClient, private loaderService: LoaderService, private toastService: ToastService) {
    this.fetchAssignments();
  }

  fetchAssignments(options: { page: number, limit: number } = {page: 1, limit: 5}) {
    return this.http.get<ExternalActionResponse<AssignmentAPIResponse>>(this.END_POINT + `?page=${options.page}&limit=${options.limit}`).subscribe(res => {
      this.metaSubject.next({
        totalDocs: res.data.totalDocs,
        limit: res.data.limit,
        page: res.data.page,
        totalPages: res.data.totalPages,
        pagingCounter: res.data.pagingCounter,
        hasPrevPage: res.data.hasPrevPage,
        hasNextPage: res.data.hasNextPage,
        prevPage: res.data.prevPage,
        nextPage: res.data.nextPage
      });
      this.assignmentsSubject.next(res.data.docs);
    });
  }

  getAssignment(options: { status: AssignmentStatus | 'all' }) {
    const DEFAULT_OPTIONS = {status: 'all'};
    options = {...DEFAULT_OPTIONS, ...options};
    if (options.status === 'all') {
      return this.assignmentsSubject.value;
    }
    return this.assignmentsSubject.value.filter(assignment => assignment.status === options.status);
  }

  private handleChange<T>(observable: Observable<ExternalActionResponse<T>>) {
    this.loaderService.show();
    return observable.subscribe(res => {
      this.fetchAssignments().add(() => this.loaderService.hide());
      this.toastService.show(res.message, res.type);
    });
  }

  addAssignment(assignment: AssignmentData) {
    this.handleChange(this.http.post<ExternalActionResponse<Assignment>>(this.END_POINT, assignment));
  }

  removeAssignment(assignmentToRemove: Assignment) {
    this.handleChange(this.http.delete<ExternalActionResponse<Assignment>>(`${this.END_POINT}/${assignmentToRemove._id}`));
  }

  updateAssignment(assignment: Assignment) {
    this.handleChange(this.http.put<ExternalActionResponse<Assignment>>(`${this.END_POINT}`, assignment));
  }

  setStatus(id: AssignmentId, status: AssignmentStatus) {
    const updatedAssignment = this.assignmentsSubject.value.find(assignment => assignment._id === id);
    if (updatedAssignment) {
      updatedAssignment.status = status;
      this.updateAssignment(updatedAssignment);
    }
  }
}
