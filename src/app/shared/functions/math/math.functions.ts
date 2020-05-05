import { Operator } from '@kaeh/shared/enums';
import * as R from 'ramda';

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
