import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from '@kaeh/shared/shared.material.module';
import { BinaryToDecimalComponent } from './binary-to-decimal.component';

describe(BinaryToDecimalComponent.name, () => {
  let component: BinaryToDecimalComponent;
  let fixture: ComponentFixture<BinaryToDecimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedMaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [BinaryToDecimalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryToDecimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('binary input value changes', () => {
    it('should be limited to binary only', () => {
      // Given the component is fresh
      // When the input value change with a string containing other characters than binary
      component.binaryControl.setValue('11not binary00');

      // Then the invalid characters should have been removed
      expect(component.binaryControl.value).toBe('1100');
    });
    it('should be limited to 8 characters', () => {
      // Given the component is fresh
      // When the input value change with a string containing other characters than binary
      component.binaryControl.setValue('110011001100');

      // Then the invalid characters should have been removed
      expect(component.binaryControl.value).toBe('11001100');
    });
    it("should convert it's value to decimal", (done) => {
      // Given the component is fresh
      // Then the binary value should have been converted to decimal
      component.decimal$.subscribe((decimal) => {
        expect(decimal).toBe('12');
        done();
      });

      // When the input value change with a binary
      component.binaryControl.setValue('1100');
    });

    it('should return an empty string if convertion fails', (done) => {
      // Given the component is fresh
      // Then the binary value should have been converted to an empty string
      component.decimal$.subscribe((decimal) => {
        expect(decimal).toBe('');
        done();
      });

      // When the input value change with a non binary string
      component.binaryControl.setValue('not binary');
    });
  });
});
