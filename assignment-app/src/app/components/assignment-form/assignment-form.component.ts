import {Component, Inject, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DatePickerComponent} from "../date-picker/date-picker.component";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {Assignment, AssignmentId, AssignmentService} from "../../../shared/services/assignment.service";
import {formatDate} from "../../../shared/utils";

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
  private _bottomSheetRef?;

  @Inject(MAT_BOTTOM_SHEET_DATA) public data: {
    type: 'editForm' | 'createForm',
    assignment : Assignment,
  } = { type: 'createForm', assignment: { _id: -1, title: "", status: "todo", date: new Date(), description: "" } };

  title = "";
  date: Date = new Date();
  description = "";

  constructor(private assignmentService: AssignmentService) {
    try {
      this._bottomSheetRef = inject<MatBottomSheetRef<AssignmentFormComponent>>(MatBottomSheetRef);

      console.log(this.data);

      if (this.data.type === 'editForm') {
        this.title = this.data.assignment.title;
        this.date = new Date(this.data.assignment.date);
        this.description = this.data.assignment.description || "";
      }
    } catch (e) {

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

      if (this.data.type === 'createForm') {
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
      _id: this.data.assignment._id,
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


}
