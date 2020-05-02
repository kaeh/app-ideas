import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from '@kaeh/core/services';
import { nameof } from '@kaeh/shared/functions';
import { SharedMaterialModule } from '@kaeh/shared/shared.material.module';

describe(NotificationService.name, () => {
  let service: NotificationService;
  let snackBarMock: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedMaterialModule, BrowserAnimationsModule],
    });
    service = TestBed.inject(NotificationService);
    snackBarMock = TestBed.inject(MatSnackBar);
    spyOn(snackBarMock, 'open');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(nameof<NotificationService>('notifySuccess'), () => {
    it('should display a snack bar with material success classes', () => {
      // When the function is called
      service.notifySuccess();
      // Then a snack bar should have been displayed
      expect(snackBarMock.open).toHaveBeenCalledTimes(1);
      expect(snackBarMock.open).toHaveBeenCalledWith(expect.any(String), undefined, {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-primary'],
      });
    });
    it('should have a default message', () => {
      // When the function is called without message
      service.notifySuccess();
      // Then a snack bar should have been displayed with the default message
      expect(snackBarMock.open).toHaveBeenCalledWith('success', undefined, expect.anything());
    });
    it('should displayed requested message', () => {
      // Given there is a custom message to display
      const message = 'This is a message';
      // When the function is called with it
      service.notifySuccess(message);
      // Then a snack bar should have been displayed with the requested message
      expect(snackBarMock.open).toHaveBeenCalledWith(message, undefined, expect.anything());
    });
  });

  describe(nameof<NotificationService>('notifySuccess'), () => {
    it('should display a snack bar with material warn classes', () => {
      // When the function is called
      service.notifyFailure();
      // Then a snack bar should have been displayed
      expect(snackBarMock.open).toHaveBeenCalledTimes(1);
      expect(snackBarMock.open).toHaveBeenCalledWith(expect.any(String), undefined, {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-warn'],
      });
    });
    it('should have a default message', () => {
      // When the function is called without message
      service.notifyFailure();
      // Then a snack bar should have been displayed
      expect(snackBarMock.open).toHaveBeenCalledWith('failure', undefined, expect.anything());
    });
    it('should displayed requested message', () => {
      // Given there is a custom message to display
      const message = 'This is a message';
      // When the function is called with it
      service.notifyFailure(message);
      // Then a snack bar should have been displayed with the requested message
      expect(snackBarMock.open).toHaveBeenCalledWith(message, undefined, expect.anything());
    });
  });
});
