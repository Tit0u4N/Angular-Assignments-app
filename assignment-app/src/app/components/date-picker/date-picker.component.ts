import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {formatDate} from "../../../shared/utils";

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    FormsModule
  ],
  templateUrl: './date-picker.component.html',
})
export class DatePickerComponent implements OnInit{
  @Output() dateEmitter = new EventEmitter<Date>();
  value: Date = new Date();

  MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  showDatepicker: boolean = false;
  month: any = '';
  year: any = '';
  no_of_days: any = [];
  blankDays: any = [];

  ngOnInit(): void {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.getNoOfDays();
    this.dateEmitter.emit(this.value);
  }

  isToday(date : any) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);
    return today.toDateString() === d.toDateString();
  }

  setValueAndClose(day : number) {
    this.value = new Date(this.year, this.month, day);
    this.dateEmitter.emit(this.value);
    this.showDatepicker = false;
  }

  getNoOfDays() {
    let i;
    let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(this.year, this.month).getDay();
    let blankDaysArray = [];
    for (i = 1; i <= dayOfWeek; i++) {
      blankDaysArray.push(i);
    }

    let daysArray = [];
    for (i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    this.blankDays = blankDaysArray;
    this.no_of_days = daysArray;
  }

  protected readonly formatDate = formatDate;
}
