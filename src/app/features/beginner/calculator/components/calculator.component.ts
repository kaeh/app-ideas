import { Component, OnDestroy, OnInit } from '@angular/core';
import { Operator } from '@kaeh/shared/enums';
import { evaluateOperation } from '@kaeh/shared/functions';
import { isOperator, OperationElement } from '@kaeh/shared/types';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, skip, takeUntil, tap } from 'rxjs/operators';

const allowedOperatorAtFirstPosition = [Operator.Add, Operator.Subtract];

@Component({
  selector: 'kaeh-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit, OnDestroy {
  public currentOperation$: Observable<string>;
  public operationResult$: Observable<string>;
  public Operator = Operator;

  private _currentResult = '';
  private _currentOperationSubject = new BehaviorSubject<string>('');
  private _destroy$ = new Subject<void>();

  public ngOnInit(): void {
    this._initCurrentOperation$();
    this._initOperationResult$();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
    this._currentOperationSubject.unsubscribe();
  }

  public addToOperation(element: OperationElement): void {
    let currentOperation = this._currentOperationSubject.getValue();
    const lastDisplayedElement = currentOperation.slice(-1) as OperationElement;

    if (isOperator(element)) {
      const noOperation = !currentOperation.length;
      const onlyElementIsOperator = currentOperation.length <= 1 && isOperator(lastDisplayedElement);
      if ((noOperation || onlyElementIsOperator) && allowedOperatorAtFirstPosition.includes(element)) {
        this._currentOperationSubject.next(element);
        return;
      } else if (isOperator(lastDisplayedElement)) {
        return;
      }
    }

    currentOperation = this._currentOperationSubject.getValue() + element;
    this._currentOperationSubject.next(currentOperation);
  }

  public clear(): void {
    this._currentOperationSubject.next('');
    this.operationResult$ = null;
    this.currentOperation$ = null;
    this._initOperationResult$();
    this._initCurrentOperation$();
  }

  public backspace(): void {
    const currentOperation = this._currentOperationSubject.getValue();
    if (currentOperation.length) {
      this._currentOperationSubject.next(currentOperation.slice(0, -1));
    }
  }

  public computeOperation(): void {
    this.operationResult$ = null;
    this._currentOperationSubject.next(this._currentResult);
    this._initOperationResult$();
  }

  private _initCurrentOperation$(): void {
    this.currentOperation$ = this._currentOperationSubject.asObservable().pipe(takeUntil(this._destroy$));
  }

  private _initOperationResult$(): void {
    this.operationResult$ = this._currentOperationSubject.asObservable().pipe(
      skip(1), // Skip first as it show 0 instead
      map(evaluateOperation),
      filter((r) => !isNaN(r)),
      map((r) => r?.toString() ?? ''),
      tap((r) => (this._currentResult = r)),
      takeUntil(this._destroy$)
    );
  }
}
