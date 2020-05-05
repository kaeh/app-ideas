import { Operator } from '@kaeh/shared/enums';

export type OperationElement = number | Operator | '.';

export function isOperator(element: OperationElement): element is Operator {
  return typeof element === 'string' && element !== '.' && isNaN(+element);
}
