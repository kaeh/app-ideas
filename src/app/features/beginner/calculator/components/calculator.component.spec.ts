import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KeyCodes, Operator } from '@kaeh/shared/enums';
import { nameof } from '@kaeh/shared/functions';
import { SharedModule } from '@kaeh/shared/shared.module';
import { CalculatorComponent } from './calculator.component';

describe(CalculatorComponent.name, () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let keyUpKeyCodeMock: jest.SpyInstance;
  const keyUpEvent = new KeyboardEvent('keyup', {
    bubbles: true,
    cancelable: true,
    shiftKey: false,
  });

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

    // Mock keyup event
    keyUpKeyCodeMock = jest.spyOn(keyUpEvent, 'keyCode', 'get');
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
    it('should replace display when computing operation and retyping a number', (done) => {
      // Given i have an operation computed
      component.addToOperation(1);
      component.addToOperation(Operator.Add);
      component.addToOperation(2);
      component.addToOperation(Operator.Multiply);
      component.addToOperation(2);
      component.computeOperation();

      // When i enter a new number
      component.addToOperation(1);

      // Then the display should be this number only
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('1');
        done();
      });
    });
    it('should keep computed value and add operator when computing operation and typing an operator', (done) => {
      // Given i have an operation computed
      component.addToOperation(1);
      component.addToOperation(Operator.Add);
      component.addToOperation(2);
      component.addToOperation(Operator.Multiply);
      component.addToOperation(2);
      component.computeOperation();

      // When i enter a new number
      component.addToOperation(Operator.Subtract);
      component.addToOperation(1);

      // Then the display should be this number only
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('5-1');
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

  describe(nameof<CalculatorComponent>('onKeyUp'), () => {
    it('should add 0 when typing on the numpad 0', (done) => {
      // Given the user type on the numpad 0 key
      keyUpKeyCodeMock.mockReturnValue(KeyCodes.Numpad0);
      window.dispatchEvent(keyUpEvent);

      // Then the display should have a 0 appended
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('0');
        done();
      });
    });
    it('should add 1 when typing on the numpad 1', (done) => {
      // Given the user type on the numpad 1 key
      keyUpKeyCodeMock.mockReturnValue(KeyCodes.Numpad1);
      window.dispatchEvent(keyUpEvent);

      // Then the display should have a 1 appended
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('1');
        done();
      });
    });
    it('should add 2 when typing on the numpad 2', (done) => {
      // Given the user type on the numpad 2 key
      keyUpKeyCodeMock.mockReturnValue(KeyCodes.Numpad2);
      window.dispatchEvent(keyUpEvent);

      // Then the display should have a 2 appended
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('2');
        done();
      });
    });
    it('should add 3 when typing on the numpad 3', (done) => {
      // Given the user type on the numpad 3 key
      keyUpKeyCodeMock.mockReturnValue(KeyCodes.Numpad3);
      window.dispatchEvent(keyUpEvent);

      // Then the display should have a 3 appended
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('3');
        done();
      });
    });
    it('should add 4 when typing on the numpad 4', (done) => {
      // Given the user type on the numpad 4 key
      keyUpKeyCodeMock.mockReturnValue(KeyCodes.Numpad4);
      window.dispatchEvent(keyUpEvent);

      // Then the display should have a 4 appended
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('4');
        done();
      });
    });
    it('should add 5 when typing on the numpad 5', (done) => {
      // Given the user type on the numpad 5 key
      keyUpKeyCodeMock.mockReturnValue(KeyCodes.Numpad5);
      window.dispatchEvent(keyUpEvent);

      // Then the display should have a 5 appended
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('5');
        done();
      });
    });
    it('should add 6 when typing on the numpad 6', (done) => {
      // Given the user type on the numpad 6 key
      keyUpKeyCodeMock.mockReturnValue(KeyCodes.Numpad6);
      window.dispatchEvent(keyUpEvent);

      // Then the display should have a 6 appended
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('6');
        done();
      });
    });
    it('should add 7 when typing on the numpad 7', (done) => {
      // Given the user type on the numpad 7 key
      keyUpKeyCodeMock.mockReturnValue(KeyCodes.Numpad7);
      window.dispatchEvent(keyUpEvent);

      // Then the display should have a 7 appended
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('7');
        done();
      });
    });
    it('should add 8 when typing on the numpad 8', (done) => {
      // Given the user type on the numpad 8 key
      keyUpKeyCodeMock.mockReturnValue(KeyCodes.Numpad8);
      window.dispatchEvent(keyUpEvent);

      // Then the display should have a 8 appended
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('8');
        done();
      });
    });
    it('should add 9 when typing on the numpad 9', (done) => {
      // Given the user type on the numpad 9 key
      keyUpKeyCodeMock.mockReturnValue(KeyCodes.Numpad9);
      window.dispatchEvent(keyUpEvent);

      // Then the display should have a 9 appended
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('9');
        done();
      });
    });
    it('should add . when typing on the numpad .', (done) => {
      // Given the user type on the numpad . key
      keyUpKeyCodeMock.mockReturnValue(KeyCodes.NumpadDot);
      window.dispatchEvent(keyUpEvent);

      // Then the display should have a . appended
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('.');
        done();
      });
    });
    it('should add + when typing on the numpad +', (done) => {
      // Given the user type on the numpad + key
      keyUpKeyCodeMock.mockReturnValue(KeyCodes.NumpadAdd);
      window.dispatchEvent(keyUpEvent);

      // Then the display should have a + appended
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe(Operator.Add);
        done();
      });
    });
    it('should add - when typing on the numpad -', (done) => {
      // Given the user type on the numpad - key
      keyUpKeyCodeMock.mockReturnValue(KeyCodes.NumpadSubtract);
      window.dispatchEvent(keyUpEvent);

      // Then the display should have a - appended
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe(Operator.Subtract);
        done();
      });
    });
    it('should add / when typing on the numpad /', (done) => {
      // Given there is an operation in progress
      component.addToOperation(1);
      // and the user type on the numpad / key
      keyUpKeyCodeMock.mockReturnValue(KeyCodes.NumpadDivide);
      window.dispatchEvent(keyUpEvent);

      // Then the display should have a / appended
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('1/');
        done();
      });
    });
    it('should add * when typing on the numpad *', (done) => {
      // Given there is an operation in progress
      component.addToOperation(1);
      // and the user type on the numpad / key
      keyUpKeyCodeMock.mockReturnValue(KeyCodes.NumpadMultiply);
      window.dispatchEvent(keyUpEvent);

      // Then the display should have a * appended
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('1*');
        done();
      });
    });
    it('should add compute value when typing on enter', (done) => {
      // Given there is an operation in progress
      component.addToOperation(1);
      component.addToOperation(Operator.Add);
      component.addToOperation(1);
      // and the user type on the enter key
      keyUpKeyCodeMock.mockReturnValue(KeyCodes.Enter);
      window.dispatchEvent(keyUpEvent);

      // Then the display should have been computed
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('2');
        done();
      });
    });
    it('should remove last character when typing on the backspace', (done) => {
      // Given there is an operation in progress
      component.addToOperation(1);
      component.addToOperation(Operator.Add);
      component.addToOperation(1);
      // and the user type on the enter key
      keyUpKeyCodeMock.mockReturnValue(KeyCodes.Backspace);
      window.dispatchEvent(keyUpEvent);

      // Then the display's last character should have been deleted
      component.currentOperation$.subscribe((r) => {
        expect(r).toBe('1+');
        done();
      });
    });
    it('should clear everything when typing on the delete key', (done) => {
      // Given there is an operation in progress
      component.addToOperation(1);
      component.addToOperation(Operator.Add);
      component.addToOperation(1);
      // and the user type on the enter key
      keyUpKeyCodeMock.mockReturnValue(KeyCodes.Delete);
      window.dispatchEvent(keyUpEvent);

      // Then the display should have  been cleared
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
});
