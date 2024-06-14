import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { DynamicCardComponent } from './components/dynamic-card/dynamic-card.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { SpecificExerciseComponent } from './components/specific-exercise/specific-exercise.component';
import { RoutinesComponent } from './components/routines/routines.component';

import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './components/error/error.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditComponent } from './components/edit/edit.component';
import { UserRoutinesComponent } from './components/user-routines/user-routines.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ExerciseCardComponent,
    FooterComponent,
    DynamicCardComponent,
    RegisterComponent,
    LoginComponent,
    ExercisesComponent,
    SpecificExerciseComponent,
    RoutinesComponent,
    ErrorComponent,
    ProfileComponent,
    EditComponent,
    UserRoutinesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
