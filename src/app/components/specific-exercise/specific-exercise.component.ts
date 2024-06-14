import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpecificExerciseToShow } from '../../interfaces/SpecificExerciseToShow';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specific-exercise',
  templateUrl: './specific-exercise.component.html',
  styleUrls: ['./specific-exercise.component.css']
})
export class SpecificExerciseComponent implements OnInit {
  exercises: SpecificExerciseToShow[] = [];
  currentRoute?: string;

  // Mapeo de índice a nombre de archivo SVG
  svgMapping = ['biceps.svg', 'dumbell.svg', 'station.svg'];

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentRoute = this.router.url;

    this.route.url.subscribe(segments => {
      if (segments.length > 0) {
        const lastSegment = segments[segments.length - 1].path;
        const apiUrl = `http://localhost:8080/exercise/getExercisesByMuscleGroup/${lastSegment}`;

        this.http.get<SpecificExerciseToShow[]>(apiUrl).subscribe((data) => {
          this.exercises = data.map((exercise, index) => ({
            ...exercise,
            svg: `assets/svgs/${this.svgMapping[index]}`
          }));

          console.log(data);
        });
      }
    });
  }
}
