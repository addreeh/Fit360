import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ExerciseToShow } from '../../interfaces/ExerciseToShow';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css'
})
export class ExercisesComponent {
  constructor(private http: HttpClient) { }

  exercises: ExerciseToShow[] = [];

  // En tu archivo de componente TypeScript
  getMarginPercentage(difficulty: number): string {
    if (difficulty === 3) {
      return '75%';
    } else if (difficulty === 2) {
      return '50%';
    } else {
      return '25%';
    }
  }


  ngOnInit() {
    this.http.get<ExerciseToShow[]>(`http://localhost:8080/exercise/getAllExercises`).subscribe((data) => {
      this.exercises = data;
    })

    this.exercises.forEach((element, index) => {
      element.width = 196;

      if (index == 0) {
        element.height = 280;
      } else if (index == 1) {
        element.height = 192;
      } else if (index == 2) {
        element.height = 280;
      } else if (index == 3) {
        element.height = 136;
      } else if (index == 4) {
        element.height = 161;
      } else if (index == 5) {
        element.height = 270;
      } else if (index == 6) {
        element.height = 150;
      } else if (index == 7) {
        element.height = 270;
      } else if (index == 8) {
        element.height = 183;
      } else if (index == 9) {
        element.height = 123;
      } else if (index == 10) {
        element.height = 168;
      } else if (index == 11) {
        element.height = 125;
      }
    });
  }
}


