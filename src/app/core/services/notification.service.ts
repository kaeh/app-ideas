import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const BaseSnackBarConfiguration = {
  duration: 2000,
};

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private readonly _snackBar: MatSnackBar) {}

  public notifySuccess(message?: string): void {
    this._snackBar.open(message ?? 'success', undefined, {
      ...BaseSnackBarConfiguration,
      panelClass: ['mat-toolbar', 'mat-primary'],
    });
  }

  public notifyFailure(message?: string): void {
    this._snackBar.open(message ?? 'failure', undefined, {
      ...BaseSnackBarConfiguration,
      panelClass: ['mat-toolbar', 'mat-warn'],
    });
  }
}
