import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.css']
})
export class ExerciseCardComponent {

  @Input() title?: string;
  @Input() imageSrc?: string;
  @Input() text?: string;
  @Input() url?: string;

}
