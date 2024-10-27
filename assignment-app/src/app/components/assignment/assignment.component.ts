import {Component, inject, Input, ProviderToken} from '@angular/core';
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
import {Assignment, AssignmentService, AssignmentStatus} from "../../../shared/services/assignment.service";
import {AssignmentFormComponent} from "../assignment-form/assignment-form.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

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
  private _bottomSheet = inject(MatBottomSheet);
  protected readonly formatDate = formatDate;
  @Input() data : Assignment = {
    _id: -1,
    title: "DEFAULT TITLE",
    status: "todo",
    date: new Date("2021-01-01"),
    description: "Description"
  }

  constructor(private assignmentService: AssignmentService) {}

  get stateToToggle(){
    if (this.isDone()) {
      return "Todo"
    } else {
      return "Done"
    }
  }

  deleteAssignment() {
    this.assignmentService.removeAssignment(this.data);
  }

  toggleAssignment(force? : boolean) {
    let nextStatus : AssignmentStatus;
    if (force === undefined) {
      nextStatus = this.isDone() ? "todo" : "done";
    } else {
      nextStatus = force ? "done" : "todo";
    }
    this.assignmentService.setStatus(this.data._id, nextStatus);
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

  openEditForm() {
    this._bottomSheet.open(AssignmentFormComponent, {data: {type: 'editForm', assignment: this.data}});
  }
}
