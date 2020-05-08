import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from '@kaeh/core/services';
import { nameof } from '@kaeh/shared/functions';
import { SharedMaterialModule } from '@kaeh/shared/shared.material.module';
import { SpectatorService, createServiceFactory, mockProvider } from '@ngneat/spectator/jest';

describe(NotificationService.name, () => {
  let spectator: SpectatorService<NotificationService>;
  let snackBarMock: MatSnackBar;
  const createService = createServiceFactory({
    service: NotificationService,
    providers: [mockProvider(MatSnackBar)]
  });

  beforeEach(() => {
    spectator = createService();
    snackBarMock = spectator.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe(nameof<NotificationService>('notifySuccess'), () => {
    it('should display a snack bar with material success classes', () => {
      // When the function is called
      spectator.service.notifySuccess();
      // Then a snack bar should have been displayed
      expect(snackBarMock.open).toHaveBeenCalledTimes(1);
      expect(snackBarMock.open).toHaveBeenCalledWith(jasmine.any(String), undefined, {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-primary'],
      });
    });
    it('should have a default message', () => {
      // When the function is called without message
      spectator.service.notifySuccess();
      // Then a snack bar should have been displayed with the default message
      expect(snackBarMock.open).toHaveBeenCalledWith('success', undefined, jasmine.anything());
    });
    it('should displayed requested message', () => {
      // Given there is a custom message to display
      const message = 'This is a message';
      // When the function is called with it
      spectator.service.notifySuccess(message);
      // Then a snack bar should have been displayed with the requested message
      expect(snackBarMock.open).toHaveBeenCalledWith(message, undefined, jasmine.anything());
    });
  });

  describe(nameof<NotificationService>('notifyFailure'), () => {
    it('should display a snack bar with material warn classes', () => {
      // When the function is called
      spectator.service.notifyFailure();
      // Then a snack bar should have been displayed
      expect(snackBarMock.open).toHaveBeenCalledTimes(1);
      expect(snackBarMock.open).toHaveBeenCalledWith(jasmine.any(String), undefined, {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-warn'],
      });
    });
    it('should have a default message', () => {
      // When the function is called without message
      spectator.service.notifyFailure();
      // Then a snack bar should have been displayed
      expect(snackBarMock.open).toHaveBeenCalledWith('failure', undefined, jasmine.anything());
    });
    it('should displayed requested message', () => {
      // Given there is a custom message to display
      const message = 'This is a message';
      // When the function is called with it
      spectator.service.notifyFailure(message);
      // Then a snack bar should have been displayed with the requested message
      expect(snackBarMock.open).toHaveBeenCalledWith(message, undefined, jasmine.anything());
    });
  });
});
