import {Component, Input, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButton} from "@angular/material/button";

export type Assignment = {
  title: string,
  status: 'done' | 'todo' | 'delayed',
  date : string
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
export class AssignmentComponent implements OnInit {
  @Input() data : Assignment = {
    title: "DEFAULT TITLE",
    status: "todo",
    date: "2021-01-01"
  }

  ngOnInit() {
    if (this.isTodo() && new Date(this.data.date) < new Date()) {
      this.data.status = "delayed"
    }
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
}
