import { ExercisesRoutinesToShow } from "./ExercisesRoutinesToShow";

export interface GroupedExercises {
  routineId: number;
  nameRoutine: string;
  exercises: ExercisesRoutinesToShow[];
}
