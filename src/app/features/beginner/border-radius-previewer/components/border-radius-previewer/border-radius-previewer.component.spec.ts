import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedMaterialModule } from '@kaeh/shared/shared.material.module';
import { BorderRadiusPreviewerComponent } from './border-radius-previewer.component';

describe(BorderRadiusPreviewerComponent.name, () => {
  let component: BorderRadiusPreviewerComponent;
  let fixture: ComponentFixture<BorderRadiusPreviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedMaterialModule],
      declarations: [BorderRadiusPreviewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorderRadiusPreviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
