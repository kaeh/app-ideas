import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CauseEffectComponent } from './cause-effect.component';

describe(CauseEffectComponent.name, () => {
  let component: CauseEffectComponent;
  let fixture: ComponentFixture<CauseEffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CauseEffectComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CauseEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
