import { Component } from '@angular/core';
import {AssignmentFormComponent} from "../../components/assignment-form/assignment-form.component";

@Component({
  selector: 'app-assignment-form-page',
  standalone: true,
  imports: [
    AssignmentFormComponent
  ],
  templateUrl: './assignment-form-page.component.html',
})
export class AssignmentFormPageComponent {

}
