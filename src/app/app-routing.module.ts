import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { SpecificExerciseComponent } from './components/specific-exercise/specific-exercise.component';
import { RoutinesComponent } from './components/routines/routines.component';
import { ProfileComponent } from './components/profile/profile.component';
import { unauthenticatedGuard } from './guards/unauthenticated.guard';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', canActivate: [unauthenticatedGuard], component: RegisterComponent },
  { path: 'login', canActivate: [unauthenticatedGuard], component: LoginComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'push', component: SpecificExerciseComponent },
  { path: 'pull', component: SpecificExerciseComponent },
  { path: 'legs', component: SpecificExerciseComponent },
  { path: 'arms', component: SpecificExerciseComponent },
  { path: 'routines', component: RoutinesComponent },
  { path: 'profile/:type', canActivate: [authGuard], component: ProfileComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
