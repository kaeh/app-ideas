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
  }
}

export function computeSubOperations(operation: string, validatingExpression: RegExp): string {
  if (validatingExpression.test(operation)) {
    return computeSubOperations(
      operation.replace(validatingExpression, compute(+RegExp.$1, +RegExp.$3, RegExp.$2 as Operator).toString()),
      validatingExpression
    );
  }

  return operation;
}

export function getSubOperationExpression(operator: Operator): RegExp {
  return new RegExp(`(\\d+)(\\${operator})(\\d+)`);
}

export function evaluateOperation(operation: string): number {
  if (operation === undefined) {
    return NaN;
  }

  const result = orderOfOperation.reduce(
    (reducedOperation, operator) => computeSubOperations(reducedOperation, getSubOperationExpression(operator)),
    operation
  );

  return +result;
}
