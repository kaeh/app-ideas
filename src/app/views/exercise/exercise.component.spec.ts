import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedMaterialModule } from '@kaeh/shared/shared.material.module';
import { MarkdownModule } from 'ngx-markdown';
import { ExerciseComponent } from './exercise.component';

describe(ExerciseComponent.name, () => {
  let component: ExerciseComponent;
  let fixture: ComponentFixture<ExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedMaterialModule,
        RouterTestingModule,
        MarkdownModule.forRoot(),
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
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
