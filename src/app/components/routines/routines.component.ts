import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ExercisesRoutinesToShow } from '../../interfaces/ExercisesRoutinesToShow';
import { GroupedExercises } from '../../interfaces/GroupedExercises';

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css'] // La propiedad es styleUrls en lugar de styleUrl
})
export class RoutinesComponent {
  constructor(private http: HttpClient) { }

  exercisesRoutines: GroupedExercises[] = []; // Cambiamos el tipo de datos para reflejar la nueva estructura

  ngOnInit() {
    this.http.get<ExercisesRoutinesToShow[]>(`http://localhost:8080/exercisesRoutines/getExercisesRoutinesByUserId/1`)
      .subscribe((data) => {
        // console.log(data);
        // Agrupamos los ejercicios por routineId
        const groupedExercises = this.groupExercisesByRoutineId(data);
        // Asignamos los datos agrupados a la propiedad exercisesRoutines
        this.exercisesRoutines = groupedExercises;
        console.log(this.exercisesRoutines);

      });
  }

  // Método para agrupar los ejercicios por routineId
  private groupExercisesByRoutineId(exercises: ExercisesRoutinesToShow[]): GroupedExercises[] {
    const groupedExercises: { [routineId: number]: ExercisesRoutinesToShow[] } = {};
    exercises.forEach(exercise => {
      const routineId = exercise.routineId;
      if (!groupedExercises[routineId]) {
        groupedExercises[routineId] = [];
      }
      groupedExercises[routineId].push(exercise);
    });
    return Object.keys(groupedExercises).map(routineId => ({
      routineId: parseInt(routineId),
      exercises: groupedExercises[parseInt(routineId)],
      nameRoutine: "Default"
    }));
  }
}
