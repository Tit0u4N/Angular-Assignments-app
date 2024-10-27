import {Component, inject} from '@angular/core';
import {AssignmentListComponent} from "../../components/assignment-list/assignment-list.component";
import {MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {AssignmentFormComponent} from "../../components/assignment-form/assignment-form.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {AuthService} from "../../../shared/services/auth.service";
import {MatIcon} from "@angular/material/icon";
import { TwSelectModule } from 'ng-tw';
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {AssignmentService, Meta} from "../../../shared/services/assignment.service";

@Component({
  selector: 'app-assignment-listing-page',
  standalone: true,
  imports: [
    AssignmentListComponent,
    MatFabButton,
    MatIcon,
    MatMiniFabButton,
    TwSelectModule,
    MatRadioGroup,
    MatRadioButton,
    ReactiveFormsModule,
    FormsModule,
    MatPaginator
  ],
  templateUrl: './assignment-listing-page.component.html',
})
export class AssignmentListingPageComponent {
  private _bottomSheet = inject(MatBottomSheet);
  public readonly sortOptions = [{ value: "all", label: "All" }, { value: "byStatus", label: "By Status" }];
  public selectedSort = "all";

  public meta : Meta = {
    totalDocs: 0,
    limit: 0,
    page: 0,
    totalPages: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
  }

  // public pageEvent: PageEvent;

  constructor(private assignmentService: AssignmentService) {
    this.assignmentService.meta$.subscribe(meta => {
      this.meta = meta;
    });
  }

  openNewAssignmentFormSheet() {
    this._bottomSheet.open(AssignmentFormComponent);
  }

  handlePageEvent(event: PageEvent) {
    this.assignmentService.fetchAssignments({page:event.pageIndex + 1, limit: event.pageSize})
  }
}
