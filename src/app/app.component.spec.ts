import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '@kaeh/app.component';
import { ExerciseComponent } from '@kaeh/views/exercise/exercise.component';
import { MenuComponent } from '@kaeh/views/menu/menu.component';
import { MockComponent } from 'ng-mocks';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, MockComponent(MenuComponent), MockComponent(ExerciseComponent)],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'app-ideas'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('app-ideas');
  });
});
