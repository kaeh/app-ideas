import { Clipboard } from '@angular/cdk/clipboard';
import { TestBed } from '@angular/core/testing';
import { NotificationService } from '@kaeh/core/services';
import { nameof } from '@kaeh/shared/functions';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { BorderRadiusPreviewerModule } from '../../border-radius-previewer.module';
import { BorderRadiusPreviewerComponent } from './border-radius-previewer.component';

describe(BorderRadiusPreviewerComponent.name, () => {
  let spectator: Spectator<BorderRadiusPreviewerComponent>;
  let clipboardMock: Clipboard;
  let notificationServiceMock: NotificationService;
  const createComponent = createComponentFactory({
    component: BorderRadiusPreviewerComponent,
    imports: [BorderRadiusPreviewerModule],
    declareComponent: false,
    providers: [mockProvider(Clipboard), mockProvider(NotificationService)],
  });

  beforeEach(() => {
    spectator = createComponent();
    clipboardMock = TestBed.inject(Clipboard);
    notificationServiceMock = TestBed.inject(NotificationService);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe(nameof<BorderRadiusPreviewerComponent>('copyToClipboard'), () => {
    it('should copy value of current border radius to clipboard', () => {
      // Given a set border radius
      spectator.component.borderRadiusStyle['border-top-left-radius'] = '10px';
      spectator.component.borderRadiusStyle['border-top-right-radius'] = '10px';
      spectator.component.borderRadiusStyle['border-bottom-left-radius'] = '10px';
      spectator.component.borderRadiusStyle['border-bottom-right-radius'] = '10px';

      // When the function is called
      spectator.component.copyToClipboard();

      // Then the value of the border radius should have been copied to the clipboard
      expect(clipboardMock.copy).toHaveBeenCalledTimes(1);
      const expected = `border-top-left-radius: 10px;\r
border-top-right-radius: 10px;\r
border-bottom-left-radius: 10px;\r
border-bottom-right-radius: 10px;\r
border-start-start-radius: 0px;\r
border-start-end-radius: 0px;\r
border-end-start-radius: 0px;\r
border-end-end-radius: 0px;`;
      expect(clipboardMock.copy).toHaveBeenCalledWith(expected);
    });

    it('should notify success of copy', () => {
      // Given the copy will succeed
      clipboardMock.copy = jest.fn(() => true);

      // When the function is called
      spectator.component.copyToClipboard();

      // Then a notification of success should have been displayed
      expect(notificationServiceMock.notifySuccess).toHaveBeenCalledTimes(1);
      expect(notificationServiceMock.notifyFailure).not.toHaveBeenCalled();
    });

    it('should notify failure of copy', () => {
      // Given the copy will fail
      clipboardMock.copy = jest.fn(() => false);

      // When the function is called
      spectator.component.copyToClipboard();

      // Then a notification of failure should have been displayed
      expect(notificationServiceMock.notifyFailure).toHaveBeenCalledTimes(1);
      expect(notificationServiceMock.notifySuccess).not.toHaveBeenCalled();
    });
  });
});
