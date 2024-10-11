import {Component, EventEmitter, inject, Output} from '@angular/core';
import {Assignment} from "../assignment/assignment.component";
import {FormsModule} from "@angular/forms";
import {DatePickerComponent} from "../date-picker/date-picker.component";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {formatDate} from "../../../shared/utils";
import {D} from "@angular/cdk/keycodes";

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
  @Output() assignmentEventEmitter : EventEmitter<Assignment> = new EventEmitter<Assignment>();
  private _bottomSheetRef =
    inject<MatBottomSheetRef<AssignmentFormComponent>>(MatBottomSheetRef);

  title = "";
  date: Date = new Date()
  description = "";

  receiveDate($event: Date) {
    this.date = $event;
  }

  verifyDate() : boolean {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return this.date > yesterday
  }

  verifyTitle() : boolean {
    return this.title !== "";
  }

  verifyDescription() : boolean {
    return this.description !== "";
  }

  verifyForm() : boolean {
    return this.verifyDate() && this.verifyTitle();
  }

  onSubmit() {
    if (this.verifyForm()) {

      this.assignmentEventEmitter.emit({
        title: this.title,
        status: "todo",
        date: this.date,
        description: this.verifyDescription() ? this.description : undefined
      });

      this.resetForm();
      this._bottomSheetRef.dismiss();
    } else {
      alert("Please fill the form correctly");
    }
  }

  resetForm() {
    this.title = "";
    this.date = new Date();
  }


}
