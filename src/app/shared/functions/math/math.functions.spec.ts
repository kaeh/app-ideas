import { Operator } from '@kaeh/shared/enums';
import { compute, computeSubOperations, evaluateOperation } from './math.functions';

describe('Math functions', () => {
  describe(compute.name, () => {
    it('should be able to compute addition', () => {
      // Given two numbers to add
      const leftOperand = 1;
      const rightOperand = 1;
      const operator = Operator.Add;

      // Then the function should add the two numbers
      expect(compute(leftOperand, rightOperand, operator)).toBe(2);
    });

    it('should be able to compute subtraction', () => {
      // Given two numbers to subtract
      const leftOperand = 3;
      const rightOperand = 1;
      const operator = Operator.Subtract;

      // Then the function should subtract the two numbers
      expect(compute(leftOperand, rightOperand, operator)).toBe(2);
    });

    it('should be able to compute multiplication', () => {
      // Given two numbers to multiply
      const leftOperand = 1;
      const rightOperand = 2;
      const operator = Operator.Multiply;

      // Then the function should multiply the two numbers
      expect(compute(leftOperand, rightOperand, operator)).toBe(2);
    });

    it('should be able to compute division', () => {
      // Given two numbers to divide
      const leftOperand = 4;
      const rightOperand = 2;
      const operator = Operator.Divide;

      // Then the function should divide the two numbers
      expect(compute(leftOperand, rightOperand, operator)).toBe(2);
    });

    it('should return NaN when trying to compute unhandled value', () => {
      // Given two numbers to add
      const leftOperand = 1;
      const rightOperand = 1;
      // and an unhandled operator
      const operator = '^';

      // Then the function should return NaN
      expect(compute(leftOperand, rightOperand, operator as Operator)).toBe(NaN);
    });
  });
  describe(computeSubOperations.name, () => {
    describe('Addition', () => {
      it('should compute simple addition operation', () => {
        // Given a simple addition operation
        const operation = '1+1';

        // Then the function should return the result of the addition
        expect(computeSubOperations(operation, Operator.Add)).toBe('2');
      });

      it('should compute multiple addition operations', () => {
        // Given multiple addition operation
        const operation = '1+2+3+4';

        // Then the function should return the result of the addition
        expect(computeSubOperations(operation, Operator.Add)).toBe('10');
      });

      it('should compute operation with floating numbers', () => {
        // Given a simple addition operation with floating numbers
        const operation = '1.2+1.3';

        // Then the function should return the result of the addition
        expect(computeSubOperations(operation, Operator.Add)).toBe('2.5');
      });
    });

    describe('Subtraction', () => {
      it('should compute simple subtraction operation', () => {
        // Given a simple subtraction operation
        const operation = '3-1';

        // Then the function should return the result of the subtraction
        expect(computeSubOperations(operation, Operator.Subtract)).toBe('2');
      });

      it('should compute multiple subtraction operations', () => {
        // Given multiple subtraction operation
        const operation = '16-1-2-3';

        // Then the function should return the result of the subtraction
        expect(computeSubOperations(operation, Operator.Subtract)).toBe('10');
      });

      it('should compute operation with floating numbers', () => {
        // Given a simple operation with floating numbers
        const operation = '3.7-1.2';

        // Then the function should return the result of the operation
        expect(computeSubOperations(operation, Operator.Subtract)).toBe('2.5');
      });
    });

    describe('Multiplication', () => {
      it('should compute simple multiplication operation', () => {
        // Given a simple multiplication operation
        const operation = '1*2';

        // Then the function should return the result of the multiplication
        expect(computeSubOperations(operation, Operator.Multiply)).toBe('2');
      });

      it('should compute multiple multiplication operations', () => {
        // Given multiple multiplication operation
        const operation = '1*2*5';

        // Then the function should return the result of the multiplication
        expect(computeSubOperations(operation, Operator.Multiply)).toBe('10');
      });

      it('should compute operation with floating numbers', () => {
        // Given a simple operation with floating numbers
        const operation = '1.5*1.5';

        // Then the function should return the result of the operation
        expect(computeSubOperations(operation, Operator.Multiply)).toBe('2.25');
      });
    });

    describe('Division', () => {
      it('should compute simple division operation', () => {
        // Given a simple division operation
        const operation = '4/2';

        // Then the function should return the result of the division
        expect(computeSubOperations(operation, Operator.Divide)).toBe('2');
      });

      it('should compute multiple division operations', () => {
        // Given multiple division operation
        const operation = '40/2/2';

        // Then the function should return the result of the division
        expect(computeSubOperations(operation, Operator.Divide)).toBe('10');
      });

      it('should compute operation with floating numbers', () => {
        // Given a simple operation with floating numbers
        const operation = '5.5/2.5';

        // Then the function should return the result of the operation
        expect(computeSubOperations(operation, Operator.Divide)).toBe('2.2');
      });
    });
  });
  describe(evaluateOperation.name, () => {
    it('should evaluate operation', () => {
      // Given an operation with multiple operators
      const operation = '2*2+4*2+5+9-8+1.5+10/2';

      // Then the function should return the result of the operation
      expect(evaluateOperation(operation)).toBe(24.5);
    });

    it('should return NaN if operation is undefined', () => {
      // Given the operation is undefined
      const operation = undefined;

      // Then the function should return NaN
      expect(evaluateOperation(operation)).toBeNaN();
    });
  });
});
