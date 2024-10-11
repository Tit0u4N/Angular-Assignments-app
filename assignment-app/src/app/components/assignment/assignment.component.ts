import {Component, Input, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButton} from "@angular/material/button";
import { formatDate } from '../../../shared/utils';

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

  toggleAssignment(force : boolean | undefined = undefined) {
    if (force === undefined) {
      this.data.status = this.data.status === "done" ? "todo" : "done";
    } else {
      this.data.status = force ? "done" : "todo";
    }
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
