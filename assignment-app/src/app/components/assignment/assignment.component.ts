import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButton, MatIconButton} from "@angular/material/button";
import { formatDate } from '../../../shared/utils';
import {MatIcon} from "@angular/material/icon";

export type Assignment = {
  title: string,
  status: 'done' | 'todo' | 'delayed',
  date : Date,
  description? : string
}

@Component({
  selector: 'app-assignment',
  standalone: true,
  imports: [
    NgClass,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanelDescription,
    MatButton,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './assignment.component.html',
})
export class AssignmentComponent {
  @Input() data : Assignment = {
    title: "DEFAULT TITLE",
    status: "todo",
    date: new Date("2021-01-01"),
    description: "Description"
  }
  @Output() onDeletedEventEmitter : EventEmitter<Assignment> = new EventEmitter<Assignment>();

  get stateToToggle(){
    if (this.isDone()) {
      return "Todo"
    } else {
      return  "Done"
    }
  }

  toggleAssignment(force : boolean | undefined = undefined) {
    if (force === undefined) {
      this.data.status = this.data.status === "done" ? "todo" : "done";
    } else {
      this.data.status = force ? "done" : "todo";
    }
  }

  deleteAssignment() {
    this.onDeletedEventEmitter.emit(this.data);
  }

  isDelayed() {
    return this.data.status === "delayed";
  }

  isDone() {
    return this.data.status === "done";
  }

  isTodo() {
    return this.data.status === "todo";
  }

  protected readonly formatDate = formatDate;
}
