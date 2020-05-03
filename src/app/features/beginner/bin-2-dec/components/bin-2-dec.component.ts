import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotificationService } from '@kaeh/core/services';
import { forceMaxLength, keepOnlyValidCharacters } from '@kaeh/shared/functions';
import { noop, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

const DecimalInputMaxLength = 8;

@Component({
  selector: 'kaeh-binary-to-decimal',
  templateUrl: './bin-2-dec.component.html',
  styleUrls: ['./bin-2-dec.component.scss'],
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
      map((v) => this._convertToDecimalV2(v))
    );
  }

  private _convertToDecimalV2(binaryString: string, index?: number, convert?: number): string {
    if (!binaryString.length) {
      return convert?.toString() ?? '';
    }

    // Using (+binaryString).toString() allow us to remove all 0 at the left hand of the string
    // Example: +"0011" is converted to 11 then reconverted to "11" but +"1100" will still be "1100"
    let currentBinaryString = (+binaryString).toString();
    let currentIndex = index ?? 0;
    let currentConvert = convert ?? 0;

    // take last character, convert to number
    const currentBinaryNumber = +currentBinaryString.slice(currentBinaryString.length - 1);
    // Remove last character from string
    currentBinaryString = currentBinaryString.substring(0, currentBinaryString.length - 1);
    // Apply conversion
    currentConvert += currentBinaryNumber * Math.pow(2, currentIndex);

    // Recursively call the method
    return this._convertToDecimalV2(currentBinaryString, ++currentIndex, currentConvert);
  }

  private _notifyInputHadError(): void {
    this._notificationService.notifyFailure('You can only insert binary numbers (0 | 1)');
  }
}
