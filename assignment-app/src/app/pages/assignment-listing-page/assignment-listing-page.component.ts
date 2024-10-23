import {Component, inject} from '@angular/core';
import {AssignmentListComponent} from "../../components/assignment-list/assignment-list.component";
import {MatFabButton} from "@angular/material/button";
import {AssignmentFormComponent} from "../../components/assignment-form/assignment-form.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {AuthService} from "../../../shared/services/auth.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-assignment-listing-page',
  standalone: true,
  imports: [
    AssignmentListComponent,
    MatFabButton,
    MatIcon
  ],
  templateUrl: './assignment-listing-page.component.html',
})
export class AssignmentListingPageComponent {

  private _bottomSheet = inject(MatBottomSheet);

  constructor(public authService: AuthService) {
  }

  openNewAssignmentFormSheet() {
    this._bottomSheet.open(AssignmentFormComponent);
  }
}
