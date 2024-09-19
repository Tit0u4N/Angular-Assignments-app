import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-assignment',
  standalone: true,
  imports: [],
  templateUrl: './assignment.component.html',
  styleUrl: './assignment.component.scss'
})
export class AssignmentComponent {
  title : string = 'Assignment';
  isDone : boolean = false;
  @Input() index : number = -1;

  ngOnInit(): void {

  }

  toggleAssignment(force : boolean = !this.isDone) {
    this.isDone = force;
  }



}
