import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DatePickerComponent} from "../date-picker/date-picker.component";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {AssignmentService} from "../../../shared/services/assignment.service";
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

  title = "";
  date: Date = new Date();
  description = "";

  constructor(private assignmentService: AssignmentService) {
    try {
      this._bottomSheetRef = inject<MatBottomSheetRef<AssignmentFormComponent>>(MatBottomSheetRef);
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

      this.assignmentService.addAssignment({
        title: this.title,
        status: "todo",
        date: formatDate(this.date),
        description: this.verifyDescription() ? this.description : undefined
      });

      this.resetForm();
      this._bottomSheetRef?.dismiss();
    } else {
      alert("Please fill the form correctly");
    }
  }

  resetForm() {
    this.title = "";
    this.date = new Date();
  }


}
