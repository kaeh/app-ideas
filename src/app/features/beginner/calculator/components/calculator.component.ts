import { Component, OnDestroy, OnInit } from '@angular/core';
import { Operator } from '@kaeh/shared/enums';
import { evaluateOperation } from '@kaeh/shared/functions';
import { OperationElement } from '@kaeh/shared/types';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, skip, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'kaeh-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit, OnDestroy {
  public currentOperation$: Observable<string>;
  public operationResult$: Observable<string>;
  public Operator = Operator;

  private _currentOperationSubject = new BehaviorSubject<string>('');
  private _destroy$ = new Subject<void>();

  public ngOnInit(): void {
    this.currentOperation$ = this._currentOperationSubject.asObservable().pipe(takeUntil(this._destroy$));
    this.operationResult$ = this._currentOperationSubject.asObservable().pipe(
      skip(1), // Skip first as it show 0 instead
      map(evaluateOperation),
      filter((r) => !isNaN(r)),
      map((r) => r?.toString() ?? ''),
      takeUntil(this._destroy$)
    );
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
    this._currentOperationSubject.unsubscribe();
  }

  public addToOperation(element: OperationElement): void {
    let currentOperation = this._currentOperationSubject.getValue();
    const lastDisplayedElement = currentOperation.slice(-1);
    if (typeof element === 'string' && isNaN(+lastDisplayedElement)) {
      return;
    }

    currentOperation = this._currentOperationSubject.getValue() + element;
    this._currentOperationSubject.next(currentOperation);
  }
}
