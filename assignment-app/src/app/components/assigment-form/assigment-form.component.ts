import {Component, Input} from '@angular/core';
import {Assignment} from "../assignment/assignment.component";
import {FormsModule} from "@angular/forms";
import {DatePickerComponent} from "../date-picker/date-picker.component";

@Component({
  selector: 'app-assigment-form',
  standalone: true,
  imports: [
    FormsModule,
    DatePickerComponent
  ],
  templateUrl: './assigment-form.component.html',
  styleUrl: './assigment-form.component.scss'
})
export class AssigmentFormComponent {
  @Input() assignment : Assignment[] = [];

  title = "";
  date = "";

  setDate(date : string) {
    console.log(date + " from form component");
    this.date = date;
  }

  verifyDate() : boolean {
    return this.date === "";
  }

  verifyTitle() : boolean {
    return this.title === "";
  }

  verifyForm() : boolean {
    return this.verifyDate() || this.verifyTitle();
  }

  onSubmit() {
    if (this.verifyForm()) {
      return;
    }
    this.assignment.push({
      title: this.title,
      status: "todo",
      date: this.date
    });
    this.resetForm();
  }

  resetForm() {
    this.title = "";
    this.date = "";
  }


}
