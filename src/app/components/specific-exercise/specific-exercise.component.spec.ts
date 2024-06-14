import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificExerciseComponent } from './specific-exercise.component';

describe('SpecificExerciseComponent', () => {
  let component: SpecificExerciseComponent;
  let fixture: ComponentFixture<SpecificExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecificExerciseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecificExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
