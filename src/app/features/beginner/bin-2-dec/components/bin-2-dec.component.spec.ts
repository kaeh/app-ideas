import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { BinaryToDecimalModule } from '../bin-2-dec.module';
import { BinaryToDecimalComponent } from './bin-2-dec.component';

describe(BinaryToDecimalComponent.name, () => {
  let spectator: Spectator<BinaryToDecimalComponent>;
  const createComponent = createComponentFactory({
    component: BinaryToDecimalComponent,
    imports: [BinaryToDecimalModule],
    declareComponent: false,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('binary input value changes', () => {
    it('should be limited to binary only', () => {
      // Given the component is fresh
      // When the input value change with a string containing other characters than binary
      spectator.component.binaryControl.setValue('11not binary00');

      // Then the invalid characters should have been removed
      expect(spectator.component.binaryControl.value).toBe('1100');
    });
    it('should be limited to 8 characters', () => {
      // Given the component is fresh
      // When the input value change with a string containing other characters than binary
      spectator.component.binaryControl.setValue('110011001100');

      // Then the invalid characters should have been removed
      expect(spectator.component.binaryControl.value).toBe('11001100');
    });
    it("should convert it's value to decimal", (done) => {
      // Given the component is fresh
      // Then the binary value should have been converted to decimal
      spectator.component.decimal$.subscribe((decimal) => {
        expect(decimal).toBe('12');
        done();
      });

      // When the input value change with a binary
      spectator.component.binaryControl.setValue('1100');
    });

    it('should return an empty string if conversion fails', (done) => {
      // Given the component is fresh
      // Then the binary value should have been converted to an empty string
      spectator.component.decimal$.subscribe((decimal) => {
        expect(decimal).toBe('');
        done();
      });

      // When the input value change with a non binary string
      spectator.component.binaryControl.setValue('not binary');
    });
  });
});
