import {Component, EventEmitter, forwardRef, OnInit, Output} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ValueChangeEvent} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  value: string = "";
  onChange: any = () => {};
  onTouched: any = () => {};


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
    this.writeValue(this.value);
    this.getNoOfDays();
  }

  isToday(date : any) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);
    return today.toDateString() === d.toDateString();
  }

  setValueAndClose(day : number) {
    let selectedDate = new Date(this.year, this.month, day);
    this.writeValue(selectedDate.toDateString());
    this.showDatepicker = false;
    this.onChange(this.value);
    console.log(this.value);
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

  // ControlValueAccessor methods

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
