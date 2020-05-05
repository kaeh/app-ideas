import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { KeyCodes, Operator } from '@kaeh/shared/enums';
import { evaluateOperation } from '@kaeh/shared/functions';
import { isOperator, OperationElement } from '@kaeh/shared/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, skip, tap } from 'rxjs/operators';

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
  private _replaceDisplayOnNextInput: boolean;
  private _currentOperationSubject = new BehaviorSubject<string>('');

  public ngOnInit(): void {
    this._initCurrentOperation$();
    this._initOperationResult$();
  }

  public ngOnDestroy(): void {
    this._currentOperationSubject.unsubscribe();
  }

  @HostListener('window:keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case KeyCodes.Numpad0:
        this.addToOperation(0);
        break;
      case KeyCodes.Numpad1:
        this.addToOperation(1);
        break;
      case KeyCodes.Numpad2:
        this.addToOperation(2);
        break;
      case KeyCodes.Numpad3:
        this.addToOperation(3);
        break;
      case KeyCodes.Numpad4:
        this.addToOperation(4);
        break;
      case KeyCodes.Numpad5:
        this.addToOperation(5);
        break;
      case KeyCodes.Numpad6:
        this.addToOperation(6);
        break;
      case KeyCodes.Numpad7:
        this.addToOperation(7);
        break;
      case KeyCodes.Numpad8:
        this.addToOperation(8);
        break;
      case KeyCodes.Numpad9:
        this.addToOperation(9);
        break;
      case KeyCodes.NumpadDivide:
        this.addToOperation(Operator.Divide);
        break;
      case KeyCodes.NumpadMultiply:
        this.addToOperation(Operator.Multiply);
        break;
      case KeyCodes.NumpadSubtract:
        this.addToOperation(Operator.Subtract);
        break;
      case KeyCodes.NumpadAdd:
        this.addToOperation(Operator.Add);
        break;
      case KeyCodes.NumpadDot:
        this.addToOperation('.');
        break;
      case KeyCodes.Backspace:
        this.backspace();
        break;
      case KeyCodes.Enter:
        this.computeOperation();
        break;
      case KeyCodes.Delete:
        this.clear();
        break;
    }
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
      } else if (noOperation || isOperator(lastDisplayedElement)) {
        return;
      }
    }

    const shouldReplaceDisplay = this._replaceDisplayOnNextInput && !isNaN(+element);
    currentOperation = shouldReplaceDisplay ? element.toString() : this._currentOperationSubject.getValue() + element;
    this._currentOperationSubject.next(currentOperation);
    this._replaceDisplayOnNextInput = false;
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
    this._replaceDisplayOnNextInput = true;
  }

  private _initCurrentOperation$(): void {
    this.currentOperation$ = this._currentOperationSubject.asObservable();
  }

  private _initOperationResult$(): void {
    this.operationResult$ = this._currentOperationSubject.asObservable().pipe(
      skip(1), // Skip first as it show 0 instead
      map(evaluateOperation),
      filter((r) => !isNaN(r)),
      map((r) => r.toString()),
      tap((r) => (this._currentResult = r))
    );
  }
}
