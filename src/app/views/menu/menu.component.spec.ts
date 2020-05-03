import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExerciseStateService } from '@kaeh/core/states';
import { nameof } from '@kaeh/shared/functions';
import { SharedMaterialModule } from '@kaeh/shared/shared.material.module';
import { MarkdownModule } from 'ngx-markdown';
import { MenuComponent } from './menu.component';

describe(MenuComponent.name, () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let exerciseStateServiceMock: ExerciseStateService;
  let routerMock: Router;
  let locationMock: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedMaterialModule,
        MarkdownModule.forRoot(),
        BrowserAnimationsModule,
      ],
      declarations: [MenuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Mock Location
    locationMock = TestBed.inject(Location);
    // Mock ExerciseStateService
    exerciseStateServiceMock = TestBed.inject(ExerciseStateService);
    // Mock router
    routerMock = TestBed.inject(Router);
    routerMock.navigate = jest.fn();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(nameof<MenuComponent>('ngOnInit'), () => {
    it('should set an undefined exercise when the current page is not an exercise', (done) => {
      // Given the current route is /a-route
      locationMock.path = jest.fn(() => '/a-route');
      // and the menu of levels contains only one level with nothing validating '/a-route' route
      // (See mocking of constants files and providers)

      // When the component is initialized
      fixture = TestBed.createComponent(MenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      // Then the selected exercise should be have been undefined
      exerciseStateServiceMock.selectedExerciseChange$.subscribe((e) => {
        expect(e).toBeUndefined();
        done();
      });
    });

    it('should set the exercise when the current page is an exercise', (done) => {
      // Given the current route is /bin-2-dec
      locationMock.path = jest.fn(() => '/bin-2-dec');
      // and the menu of levels contains only one level with a route validating '/bin-2-dec'
      // (See mocking of constants files and providers)

      // When the component is initialized
      fixture = TestBed.createComponent(MenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      // Then the selected exercise should be have been set
      exerciseStateServiceMock.selectedExerciseChange$.subscribe((e) => {
        expect(e).toEqual({
          title: expect.any(String),
          markdownPath: expect.any(String),
          routerLink: ['beginner/bin-2-dec'],
        });
        done();
      });
    });
  });

  describe(nameof<MenuComponent>('navigateTo'), () => {
    it('should set the exercise', (done) => {
      // When i change route to a given exercise
      component.navigateTo({
        title: 'an-exercise',
        markdownPath: 'an-exercise',
        routerLink: ['an-exercise'],
      });
      // Then the selected exercise should have been updated
      exerciseStateServiceMock.selectedExerciseChange$.subscribe((e) => {
        expect(e).toEqual({
          title: 'an-exercise',
          markdownPath: 'an-exercise',
          routerLink: ['an-exercise'],
        });
        done();
      });
    });

    it('should change the current route', () => {
      // When i change route to a given exercise
      component.navigateTo({
        title: 'an-exercise',
        markdownPath: 'an-exercise',
        routerLink: ['an-exercise'],
      });

      // Then the router should have been called
      expect(routerMock.navigate).toHaveBeenCalledTimes(1);
      expect(routerMock.navigate).toHaveBeenCalledWith(['an-exercise']);
    });
  });
});
