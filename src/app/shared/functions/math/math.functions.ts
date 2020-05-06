import { Operator } from '@kaeh/shared/enums';
import * as R from 'ramda';
import { getLastCharacterAsNumber, removeLastCharacter } from '../string/string.functions';

const orderOfOperation = [Operator.Multiply, Operator.Divide, Operator.Subtract, Operator.Add];

export function compute(lefOperand: number, rightOperand: number, operator: Operator): number {
  switch (operator) {
    case Operator.Add:
      return R.add(lefOperand, rightOperand);
    case Operator.Subtract:
      return R.subtract(lefOperand, rightOperand);
    case Operator.Multiply:
      return R.multiply(lefOperand, rightOperand);
    case Operator.Divide:
      return R.divide(lefOperand, rightOperand);
    default:
      return NaN;
  }
}

export function computeSubOperations(operation: string, operator: Operator): string {
  const validatingExpression = new RegExp(`(\\d+\\.?\\d*)(\\${operator})(\\d+\\.?\\d*)`);
  if (validatingExpression.test(operation)) {
    return computeSubOperations(
      operation.replace(validatingExpression, compute(+RegExp.$1, +RegExp.$3, RegExp.$2 as Operator).toString()),
      operator
    );
  }

  return operation;
}

export function evaluateOperation(operation: string): number {
  if (operation === undefined) {
    return NaN;
  }

  const result = orderOfOperation.reduce(computeSubOperations, operation);

  return +result;
}

export function convertToDecimal(binaryString: string, index?: number, convert?: number): string {
  if (!binaryString?.length) {
    return convert?.toString() ?? '';
  }

  // Using (+binaryString).toString() allow us to remove all 0 at the left hand of the string
  // Example: +"0011" is converted to 11 then reconverted to "11" but +"1100" will still be "1100"
  let currentBinaryString = (+binaryString).toString();
  let currentIndex = index ?? 0;
  let currentConvert = convert ?? 0;

  // Apply conversion
  currentConvert += getLastCharacterAsNumber(currentBinaryString) * Math.pow(2, currentIndex);
  // Remove last character from string
  currentBinaryString = removeLastCharacter(currentBinaryString);

  // Recursively call the method
  return convertToDecimal(currentBinaryString, ++currentIndex, currentConvert);
}
