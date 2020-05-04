import { Clipboard } from '@angular/cdk/clipboard';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from '@kaeh/core/services';
import { nameof } from '@kaeh/shared/functions';
import { SharedMaterialModule } from '@kaeh/shared/shared.material.module';
import { BorderRadiusPreviewerComponent } from './border-radius-previewer.component';

describe(BorderRadiusPreviewerComponent.name, () => {
  let component: BorderRadiusPreviewerComponent;
  let fixture: ComponentFixture<BorderRadiusPreviewerComponent>;
  let clipboardMock: Clipboard;
  let notificationServiceMock: NotificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedMaterialModule, BrowserAnimationsModule],
      declarations: [BorderRadiusPreviewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorderRadiusPreviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Mock Clipboard
    clipboardMock = TestBed.inject(Clipboard);
    clipboardMock.copy = jest.fn();

    // Mock NotificationService
    notificationServiceMock = TestBed.inject(NotificationService);
    notificationServiceMock.notifySuccess = jest.fn();
    notificationServiceMock.notifyFailure = jest.fn();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(nameof<BorderRadiusPreviewerComponent>('copyToClipboard'), () => {
    it('should copy value of current border radius to clipboard', () => {
      // Given a set border radius
      component.borderRadiusStyle['border-top-left-radius'] = '10px';
      component.borderRadiusStyle['border-top-right-radius'] = '10px';
      component.borderRadiusStyle['border-bottom-left-radius'] = '10px';
      component.borderRadiusStyle['border-bottom-right-radius'] = '10px';

      // When the function is called
      component.copyToClipboard();

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
      component.copyToClipboard();

      // Then a notification of success should have been displayed
      expect(notificationServiceMock.notifySuccess).toHaveBeenCalledTimes(1);
      expect(notificationServiceMock.notifyFailure).not.toHaveBeenCalled();
    });

    it('should notify failure of copy', () => {
      // Given the copy will fail
      clipboardMock.copy = jest.fn(() => false);

      // When the function is called
      component.copyToClipboard();

      // Then a notification of failure should have been displayed
      expect(notificationServiceMock.notifyFailure).toHaveBeenCalledTimes(1);
      expect(notificationServiceMock.notifySuccess).not.toHaveBeenCalled();
    });
  });
});
