import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotificationService } from '@kaeh/core/services';
import { convertToDecimal, forceMaxLength, keepOnlyValidCharacters } from '@kaeh/shared/functions';
import { noop, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

const DecimalInputMaxLength = 8;

@Component({
  selector: 'kaeh-binary-to-decimal',
  templateUrl: './bin-2-dec.component.html',
  styleUrls: ['./bin-2-dec.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BinaryToDecimalComponent implements OnInit {
  public binaryControl = new FormControl();
  public decimal$: Observable<string>;

  public constructor(private readonly _notificationService: NotificationService) {}

  public ngOnInit(): void {
    this.decimal$ = this.binaryControl.valueChanges.pipe(
      distinctUntilChanged(),
      map((v) => keepOnlyValidCharacters(v, 0, 1)),
      tap((v) => (v.hadErrors ? this._notifyInputHadError() : noop())),
      map((v) => v.result),
      map((v) => forceMaxLength(v, DecimalInputMaxLength)),
      tap((v) => this.binaryControl.setValue(v)),
      debounceTime(300),
      map(convertToDecimal)
    );
  }

  private _notifyInputHadError(): void {
    this._notificationService.notifyFailure('You can only insert binary numbers (0 | 1)');
  }
}
