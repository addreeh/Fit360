import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCardComponent } from './dynamic-card.component';

describe('DynamicCardComponent', () => {
  let component: DynamicCardComponent;
  let fixture: ComponentFixture<DynamicCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
