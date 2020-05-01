import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forceMaxLength, keepOnlyValidCharacters } from '@kaeh/shared/functions';
import { noop, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';

const DecimalInputMaxLength = 8;

@Component({
  selector: 'kaeh-binary-to-decimal',
  templateUrl: './binary-to-decimal.component.html',
  styleUrls: ['./binary-to-decimal.component.scss'],
})
export class BinaryToDecimalComponent implements OnInit, OnDestroy {
  public binaryControl = new FormControl();
  public decimal$: Observable<string>;
  private _destroy$ = new Subject<void>();

  public constructor(private readonly _snackBar: MatSnackBar) {}

  public ngOnInit(): void {
    this.decimal$ = this.binaryControl.valueChanges.pipe(
      distinctUntilChanged(),
      map((v) => keepOnlyValidCharacters(v, 0, 1)),
      tap((v) => (v.hadErrors ? this._notifyInputHadError() : noop())),
      map((v) => v.result),
      map((v) => forceMaxLength(v, DecimalInputMaxLength)),
      tap((v) => this.binaryControl.setValue(v)),
      debounceTime(300),
      map((v) => this._convertToDecimal(v)),
      takeUntil(this._destroy$)
    );
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }

  private _convertToDecimal(binaryValue: string): string {
    const convert = parseInt(binaryValue, 2);
    return convert >= 0 ? convert.toString() : '';
  }

  private _notifyInputHadError(): void {
    this._snackBar.open('You can only insert binary', undefined, {
      duration: 2000,
      panelClass: 'snack-error',
    });
  }
}
