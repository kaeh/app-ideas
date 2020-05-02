import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedMaterialModule } from '@kaeh/shared/shared.material.module';
import { ExerciseComponent } from './exercise.component';

describe(ExerciseComponent.name, () => {
  let component: ExerciseComponent;
  let fixture: ComponentFixture<ExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedMaterialModule],
      declarations: [ExerciseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
