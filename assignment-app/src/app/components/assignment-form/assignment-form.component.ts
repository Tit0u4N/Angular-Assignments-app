import {Component, Inject, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DatePickerComponent} from "../date-picker/date-picker.component";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {Assignment, AssignmentId, AssignmentService} from "../../../shared/services/assignment.service";
import {formatDate} from "../../../shared/utils";

export type AssignmentFormInjectedData = {
  type: 'editForm' | 'createForm',
  assignment: Assignment
}

const DEFAULT_INJECTED_DATA : AssignmentFormInjectedData = {
  type: 'createForm',
  assignment: {_id: -1, title: "", status: "todo", date: new Date(), description: ""}
}

@Component({
  selector: 'app-assignment-form',
  standalone: true,
  imports: [
    FormsModule,
    DatePickerComponent
  ],
  templateUrl: './assignment-form.component.html',
})
export class AssignmentFormComponent {
  private _bottomSheetRef : MatBottomSheetRef<AssignmentFormComponent> | undefined;

  private assignmentId: AssignmentId = -1;
  title = "";
  date: Date = new Date();
  description = "";

  private formType!: 'editForm' | 'createForm';

  constructor(private assignmentService: AssignmentService) {
    this.initBottomSheetRef();
    this.initInjectedData();
  }

  private initBottomSheetRef() {
    try {
      this._bottomSheetRef = inject<MatBottomSheetRef<AssignmentFormComponent>>(MatBottomSheetRef);
    } catch (e) {

    }
  }

  private initInjectedData() {
    try {
      const injectedData = inject<AssignmentFormInjectedData>(MAT_BOTTOM_SHEET_DATA);
      if (injectedData.type === 'editForm') {
        this.assignmentId = injectedData.assignment._id;
        this.title = injectedData.assignment.title;
        this.date = new Date(injectedData.assignment.date);
        this.description = injectedData.assignment.description || "";

        this.formType = 'editForm';
      }
    } catch (e) {
      this.formType = 'createForm';
    }
  }

  receiveDate($event: Date) {
    this.date = $event;
  }

  verifyDate(): boolean {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return this.date > yesterday
  }

  verifyTitle(): boolean {
    return this.title !== "";
  }

  verifyDescription(): boolean {
    return this.description !== "";
  }

  verifyForm(): boolean {
    return this.verifyDate() && this.verifyTitle();
  }

  onSubmit() {
    if (this.verifyForm()) {
      if (this.formType === 'createForm') {
        this.addAssignmentToService();
      } else {
        this.updateAssignmentToService();
      }

      this.resetForm();
      this._bottomSheetRef?.dismiss();
    } else {
      alert("Please fill the form correctly");
    }
  }

  private addAssignmentToService() {
    this.assignmentService.addAssignment({
      title: this.title,
      status: "todo",
      date: formatDate(this.date),
      description: this.verifyDescription() ? this.description : undefined
    });
  }

  private updateAssignmentToService() {
    this.assignmentService.updateAssignment({
      _id: this.assignmentId,
      title: this.title,
      status: "todo",
      date: formatDate(this.date),
      description: this.verifyDescription() ? this.description : undefined
    });
  }

  resetForm() {
    this.title = "";
    this.date = new Date();
  }

  get isEdit() {
    return this.formType === 'editForm';
  }


}
