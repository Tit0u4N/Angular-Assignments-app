import { Component } from '@angular/core';
import {AssignmentListComponent} from "../../components/assignment-list/assignment-list.component";

@Component({
  selector: 'app-assignment-listing-page',
  standalone: true,
  imports: [
    AssignmentListComponent
  ],
  templateUrl: './assignment-listing-page.component.html',
})
export class AssignmentListingPageComponent {

}
