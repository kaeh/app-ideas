import { Injectable } from '@angular/core';

type ToStringFunc = (value: unknown) => string;

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  private _valueToString = (value: unknown): string => value as string;

  public copy(value: unknown, toStringFunc?: ToStringFunc): boolean {
    const stringifiedValue = toStringFunc ? toStringFunc(value) : this._valueToString(value);

    try {
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = stringifiedValue;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);

      return true;
    } catch {
      return false;
    }
  }
}
