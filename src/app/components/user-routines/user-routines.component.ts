import { Component } from '@angular/core';
import { ExercisesRoutinesToShow } from '../../interfaces/ExercisesRoutinesToShow';
import { GroupedExercises } from '../../interfaces/GroupedExercises';
import { UserToProfile } from '../../interfaces/UserToProfile';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ExerciseToShow } from '../../interfaces/ExerciseToShow';
import { RoutineToEdit } from '../../interfaces/RoutineToEdit';
import { SeriesRepsToEdit } from '../../interfaces/SeriesRepsToEdit';
import { RotuineToCreate } from '../../interfaces/RoutineToCreate';


@Component({
  selector: 'app-user-routines',
  templateUrl: './user-routines.component.html',
  styleUrl: './user-routines.component.css'
})
export class UserRoutinesComponent {
  user: UserToProfile | null = null;
  exercisesRoutines: GroupedExercises[] = [];
  exercises: { [key: string]: ExerciseToShow[] } = {};
  selectedExercise: string = 'Choose exercise';
  repsValue: number | null = null;
  seriesValue: number | null = null;
  showErrorAlert = false;
  routineName: string = '';
  submitted: boolean = false;
  reps: number | null = null;
  series: number | null = null;

  constructor(private http: HttpClient, private authService: AuthService) { }

  routineNameValid: boolean = false;


  validateInput() {
    this.routineNameValid = this.routineName.length > 0;
  }


  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      let token = this.authService.getToken(); // Obtener el token del servicio de autenticación
      this.http.get<UserToProfile>(`http://localhost:8080/user/getUser/${token}`).subscribe((data) => {
        this.user = data;
        const fecha = new Date(this.user.joinDate).toLocaleDateString();
        this.user.joinDate = fecha;
        if (this.user.picture == "")
          this.user.picture = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";
        else
          this.user.picture = "data:image/jpg;base64," + this.user.picture;

        // this.http.get<ExercisesRoutinesToShow[]>(`http://localhost:8080/exercisesRoutines/getExercisesRoutinesByUserId/${this.user!.id}`)
        //   .subscribe((data) => {
        //     const groupedExercises = this.groupExercisesByRoutineId(data);
        //     this.exercisesRoutines = groupedExercises;
        //   });

        // Verificar si el usuario es administrador

        if (this.user.role === 'admin') {
          // Si es administrador, obtener todas las rutinas de todos los usuarios
          this.http.get<ExercisesRoutinesToShow[]>(`http://localhost:8080/exercisesRoutines/getAllExercisesRoutines`)
            .subscribe((data) => {

              const groupedExercises = this.groupExercisesByRoutineId(data);
              this.exercisesRoutines = groupedExercises;
            });
        } else {
          // Si no es administrador, obtener solo las rutinas del usuario actual
          this.http.get<ExercisesRoutinesToShow[]>(`http://localhost:8080/exercisesRoutines/getExercisesRoutinesByUserId/${this.user!.id}`)
            .subscribe((data) => {
              const groupedExercises = this.groupExercisesByRoutineId(data);
              this.exercisesRoutines = groupedExercises;
            });
        }

        this.http.get<ExerciseToShow[]>(`http://localhost:8080/exercise/getAllExercises`)
          .subscribe((data) => {
            const exercisesByMuscleGroup: { [key: string]: ExerciseToShow[] } = {};

            data.forEach((exercise) => {
              if (!exercisesByMuscleGroup[exercise.muscleGroup]) {
                exercisesByMuscleGroup[exercise.muscleGroup] = [];
              }
              exercisesByMuscleGroup[exercise.muscleGroup].push(exercise);
            });

            this.exercises = exercisesByMuscleGroup;
          });

      });
    }
  }

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
      nameRoutine: groupedExercises[parseInt(routineId)][0].routineName
    }));
  }

  reload() {
    window.location.reload();
  }

  addExercise(routineId: number) {
    const addedExercise = { routineId: routineId, exerciseId: this.selectedExercise, repsValue: this.repsValue, seriesValue: this.seriesValue };

    this.http.post<any>(`http://localhost:8080/exercisesRoutines/addExercise`, addedExercise)
      .subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          console.error("Error en el registro:", error);
          this.showErrorAlert = true;
        }
      );


  }

  removeExercise(id: number) {
    this.http.delete<any>(`http://localhost:8080/exercisesRoutines/deleteExercise/${id}`)
      .subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          console.error("Error en el registro:", error);
          this.showErrorAlert = true;
        }
      );
  }

  onNamePressed(event: Event, routineId: number) {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      const editableElement = event.target as HTMLElement;
      const name = editableElement.textContent?.trim(); // Obtiene el contenido del campo editable

      const newRoutine: RoutineToEdit = {
        id: routineId,
        name: name || '' // Si el nombre es null o undefined, asigna una cadena vacía
      };

      editableElement.blur(); // Esto hará que el campo editable pierda el foco

      this.http.post<any>(`http://localhost:8080/routine/editName`, newRoutine)
        .subscribe(
          (response) => {
          },
          (error) => {
            console.error("Error en el registro:", error);
            this.showErrorAlert = true;
          }
        );
    }
  }

  onSeriesPressed(event: Event, routineId: number) {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      const editableElement = event.target as HTMLElement;
      const name = editableElement.textContent?.trim();
      const number = parseInt(name!);

      const newRoutine: SeriesRepsToEdit = {
        id: routineId,
        number: number // Si el nombre es null o undefined, asigna una cadena vacía
      };

      editableElement.blur(); // Esto hará que el campo editable pierda el foco

      this.http.post<any>(`http://localhost:8080/exercisesRoutines/editSeries`, newRoutine)
        .subscribe(
          (response) => {
          },
          (error) => {
            console.error("Error en el registro:", error);
            this.showErrorAlert = true;
          }
        );
    }
  }

  onRepsPressed(event: Event, routineId: number) {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      const editableElement = event.target as HTMLElement;
      const name = editableElement.textContent?.trim(); // Obtiene el contenido del campo editable

      const number = parseInt(name!);

      const newRoutine: SeriesRepsToEdit = {
        id: routineId,
        number: number // Si el nombre es null o undefined, asigna una cadena vacía
      };
      editableElement.blur(); // Esto hará que el campo editable pierda el foco

      this.http.post<any>(`http://localhost:8080/exercisesRoutines/editReps`, newRoutine)
        .subscribe(
          (response) => {
            console.log("Registro exitoso:", response);
          },
          (error) => {
            console.error("Error en el registro:", error);
            this.showErrorAlert = true;
          }
        );
    }
  }

  removeRoutine(routineId: Number) {
    this.http.delete<any>(`http://localhost:8080/routine/delete/${routineId}`)
      .subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          this.showErrorAlert = true;
        }
      );
  }

  createRoutine(routineName: string, exerciseId: any, series: number, reps: number) {
    this.submitted = true;

    if (!routineName || !exerciseId || !series || !reps) {
      // Algunos campos están vacíos, muestra un mensaje de error o realiza alguna acción apropiada.
      return;
    }

    const newRoutine: RotuineToCreate = {
      user_id: this.user!.id,
      name: routineName
    };

    this.http.post<RotuineToCreate>(`http://localhost:8080/routine/create`, newRoutine)
      .subscribe(
        (response) => {
          const newExerciseId = parseInt(exerciseId);

          const addedExercise = { routineId: response, exerciseId: newExerciseId, repsValue: reps, seriesValue: series };


          this.http.post<any>(`http://localhost:8080/exercisesRoutines/addExercise`, addedExercise)
            .subscribe(
              (response) => {
                window.location.reload();
              },
              (error) => {
                console.error("Error en el registro:", error);
                this.showErrorAlert = true;
              }
            );

          // window.location.reload();
        },
        (error) => {
          console.error("Error en el registro:", error);
          this.showErrorAlert = true;
        }
      );
  }


  showConfirmationPopup: boolean = false;
  showPopUp() {
    this.showConfirmationPopup = true;
  }

  cancelDelete() {
    this.showConfirmationPopup = false;
  }
}
