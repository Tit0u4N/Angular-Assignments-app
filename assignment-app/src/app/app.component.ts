import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AssignmentComponent} from "./components/assignment/assignment.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AssignmentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'assignment-app';
  assignments = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
}
