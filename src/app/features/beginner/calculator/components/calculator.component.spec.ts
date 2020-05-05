import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Operator } from '@kaeh/shared/enums';
import { nameof } from '@kaeh/shared/functions';
import { SharedModule } from '@kaeh/shared/shared.module';
import { CalculatorComponent } from './calculator.component';

describe(CalculatorComponent.name, () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      imports: [SharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(nameof<CalculatorComponent>('addToOperation'), () => {
    it('should allow + to be present as first character', (done) => {
      // Given I want to add +
      const expected = Operator.Add;

      // When I call the addToOperation function with only this character
      component.addToOperation(expected);

      // Then I should only have this character in display
      component.currentOperation$.subscribe((r) => {
        expect(r).toEqual(expected);
        done();
      });
    });
    it('should allow - to be present as first character', (done) => {
      // Given I want to add -
      const expected = Operator.Subtract;

      // When I call the addToOperation function with only this character
      component.addToOperation(expected);

      // Then I should only have this character in display
      component.currentOperation$.subscribe((r) => {
        expect(r).toEqual(expected);
        done();
      });
    });
    it('should allow . to be present as first character', (done) => {
      // Given I want to add .
      const expected = '.';

      // When I call the addToOperation function with only this character
      component.addToOperation(expected);

      // Then I should only have this character in display
      component.currentOperation$.subscribe((r) => {
        expect(r).toEqual(expected);
        done();
      });
    });
    it('should replace first operator by new one when changing', (done) => {
      // Given I want to add +
      const firstInserted = Operator.Subtract;
      const expected = Operator.Add;

      // When I call the addToOperation function with only this character then i change
      component.addToOperation(firstInserted);
      component.addToOperation(expected);

      // Then I should only have this character in display
      component.currentOperation$.subscribe((r) => {
        expect(r).toEqual(expected);
        done();
      });
    });
    it('should forbid * to be present as first character', (done) => {
      // Given I want to add *
      const expected = Operator.Multiply;

      // When I call the addToOperation function with only this character
      component.addToOperation(expected);

      // Then I should only have this character in display
      component.currentOperation$.subscribe((r) => {
        expect(r).toEqual('');
        done();
      });
    });
    it('should allow / to be present as first character', (done) => {
      // Given I want to add /
      const expected = Operator.Divide;

      // When I call the addToOperation function with only this character
      component.addToOperation(expected);

      // Then I should only have this character in display
      component.currentOperation$.subscribe((r) => {
        expect(r).toEqual('');
        done();
      });
    });
    it('should forbid forbidden characters as first operator when trying to change', (done) => {
      // Given I want to add +
      const expected = Operator.Subtract;
      const operator = Operator.Multiply;

      // When I call the addToOperation function with only this character then i change
      component.addToOperation(expected);
      component.addToOperation(operator);

      // Then I should only have this character in display
      component.currentOperation$.subscribe((r) => {
        expect(r).toEqual(expected);
        done();
      });
    });
    it('should add operation', (done) => {
      // Given i want to display 1+2*2
      const expected = '1+2*2';

      // When i call the operation multiple time to simulate click on buttons
      component.addToOperation(1);
      component.addToOperation(Operator.Add);
      component.addToOperation(2);
      component.addToOperation(Operator.Multiply);
      component.addToOperation(2);

      // Then I should have the entire operation in display
      component.currentOperation$.subscribe((r) => {
        expect(r).toEqual(expected);
        done();
      });
    });
  });

  describe(nameof<CalculatorComponent>('clear'), () => {
    it('should clear current operation and result', (done) => {
      // Given i have an operation in progress
      component.addToOperation(1);
      component.addToOperation(Operator.Add);
      component.addToOperation(2);
      component.addToOperation(Operator.Multiply);
      component.addToOperation(2);

      // When i call the clear method
      component.clear();

      // Then i should have nothing in the display
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('');
        done();
      });
      component.operationResult$.subscribe((r) => {
        expect(r).toBe('');
        done();
      });
    });
  });

  describe(nameof<CalculatorComponent>('backspace'), () => {
    it('should do nothing if there is no operation', (done) => {
      // When i call the backspace method
      component.backspace();

      // Then the operation should still be empty and no error should have thrown
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('');
        done();
      });
    });

    it('should remove last operation character', (done) => {
      // Given i have an operation in progress
      component.addToOperation(1);
      component.addToOperation(Operator.Add);
      component.addToOperation(2);
      component.addToOperation(Operator.Multiply);
      component.addToOperation(2);

      // When i call the backspace method
      component.backspace();

      // Then the last character of the operation should have been removed
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('1+2*');
        done();
      });
    });
  });

  describe(nameof<CalculatorComponent>('computeOperation'), () => {
    it('should update operation display with result value and reset result display', (done) => {
      // Given i have an operation in progress
      component.addToOperation(1);
      component.addToOperation(Operator.Add);
      component.addToOperation(2);
      component.addToOperation(Operator.Multiply);
      component.addToOperation(2);

      // When i call the compute function
      component.computeOperation();

      // Then the result should have been emptied
      component.operationResult$.subscribe((r) => {
        expect(r).toBe('');
        done();
      });
      // And the display should have been updated
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('5');
        done();
      });
    });
  });
});
