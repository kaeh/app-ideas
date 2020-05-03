import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AssetsService } from '@kaeh/core/services';
import { ExerciseStateService } from '@kaeh/core/states';
import { nameof } from '@kaeh/shared/functions';
import { SharedMaterialModule } from '@kaeh/shared/shared.material.module';
import { MarkdownModule } from 'ngx-markdown';
import { of } from 'rxjs';
import { ExerciseComponent } from './exercise.component';

describe(ExerciseComponent.name, () => {
  let component: ExerciseComponent;
  let fixture: ComponentFixture<ExerciseComponent>;
  let exerciseStateServiceMock: ExerciseStateService;
  let assetsServiceMock: AssetsService;

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

    // Mock ExerciseStateService
    exerciseStateServiceMock = TestBed.inject(ExerciseStateService);
    // Mock AssetsService
    assetsServiceMock = TestBed.inject(AssetsService);
    assetsServiceMock.getReadme = jest.fn(() => of(''));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(nameof<ExerciseComponent>('title$'), () => {
    it('should take default value when no exercise is selected', (done) => {
      // Given no exercise is selected
      exerciseStateServiceMock.selectedExercise = undefined;
      // Then the title should be the default one
      component.title$.subscribe((title) => {
        expect(title).toBe('App Ideas by Florin Pop, coded by Kaeh');
        done();
      });
    });

    it('should get value of current exercise', (done) => {
      // Given an exercise is selected
      exerciseStateServiceMock.selectedExercise = {
        title: 'An exercise',
        markdownPath: undefined,
        routerLink: undefined,
      };
      // Then the title should be the title of the selected exercise
      component.title$.subscribe((title) => {
        expect(title).toBe('An exercise');
        done();
      });
    });

    it('should change value when exercise change', (done) => {
      // Given an exercise is selected
      exerciseStateServiceMock.selectedExercise = {
        title: 'An exercise',
        markdownPath: undefined,
        routerLink: undefined,
      };
      // And it's immediately changed to another one
      exerciseStateServiceMock.selectedExercise = {
        title: 'Another exercise',
        markdownPath: undefined,
        routerLink: undefined,
      };

      // Then the title should be the title of the selected exercise
      component.title$.subscribe((title) => {
        expect(title).toBe('Another exercise');
        done();
      });
    });
  });

  describe(nameof<ExerciseComponent>('pageDescription$'), () => {
    it('should take default value when no exercise is selected', (done) => {
      // Given no exercise is selected
      exerciseStateServiceMock.selectedExercise = undefined;

      // When the assets service return some value
      assetsServiceMock.getReadme = jest.fn(() => of('a readme content'));

      // Then the page description should be the default one
      component.pageDescription$.subscribe((pageDescription) => {
        expect(pageDescription).toBe('a readme content');
        done();
      });
      // And the assets service should have been called once
      expect(assetsServiceMock.getReadme).toHaveBeenCalledTimes(1);
      // And with the default markdown path as parameter
      expect(assetsServiceMock.getReadme).toHaveBeenCalledWith('README.md');
    });

    it('should get value of current exercise', (done) => {
      // Given an exercise is selected
      exerciseStateServiceMock.selectedExercise = {
        title: undefined,
        markdownPath: 'a/path/to/markdown',
        routerLink: undefined,
      };
      // When the assets service return some value
      assetsServiceMock.getReadme = jest.fn(() => of('a readme content'));

      // Then the page description should be the default one
      component.pageDescription$.subscribe((pageDescription) => {
        expect(pageDescription).toBe('a readme content');
        done();
      });
      // And the assets service should have been called once
      expect(assetsServiceMock.getReadme).toHaveBeenCalledTimes(1);
      // And with the default markdown path as parameter
      expect(assetsServiceMock.getReadme).toHaveBeenCalledWith('a/path/to/markdown');
    });

    it('should change value when exercise change', (done) => {
      // Given an exercise is selected
      exerciseStateServiceMock.selectedExercise = {
        title: undefined,
        markdownPath: 'a/path',
        routerLink: undefined,
      };
      // And it's immediately changed to another one
      exerciseStateServiceMock.selectedExercise = {
        title: undefined,
        markdownPath: 'a/path/to/markdown',
        routerLink: undefined,
      };

      // When the assets service return some value
      assetsServiceMock.getReadme = jest.fn(() => of('a readme content'));

      // Then the page description should be the default one
      component.pageDescription$.subscribe((pageDescription) => {
        expect(pageDescription).toBe('a readme content');
        done();
      });
      // And the assets service should have been called once
      expect(assetsServiceMock.getReadme).toHaveBeenCalledTimes(1);
      // And with the default markdown path as parameter
      expect(assetsServiceMock.getReadme).toHaveBeenCalledWith('a/path/to/markdown');
    });
  });
});
