import { Clipboard } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotificationService } from '@kaeh/core/services';

type BorderRadius = {
  'border-top-left-radius': string;
  'border-top-right-radius': string;
  'border-bottom-right-radius': string;
  'border-bottom-left-radius': string;

  'border-start-start-radius': string;
  'border-start-end-radius': string;
  'border-end-start-radius': string;
  'border-end-end-radius': string;
};

@Component({
  selector: 'kaeh-border-radius-previewer',
  templateUrl: './border-radius-previewer.component.html',
  styleUrls: ['./border-radius-previewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BorderRadiusPreviewerComponent {
  public readonly borderRadiusStyle: BorderRadius = {
    'border-top-left-radius': '0px',
    'border-top-right-radius': '0px',
    'border-bottom-left-radius': '0px',
    'border-bottom-right-radius': '0px',

    'border-start-start-radius': '0px',
    'border-start-end-radius': '0px',
    'border-end-start-radius': '0px',
    'border-end-end-radius': '0px',
  };
  /** Clone of borderRadiusStyle, used to create sliders but should not be updated */
  public readonly borderRadiusStyleClone = Object.assign({}, this.borderRadiusStyle);

  public constructor(private readonly _notificationService: NotificationService, private readonly _clipboard: Clipboard) {}

  public copyToClipboard(): void {
    const success = this._clipboard.copy(this._borderRadiusStyleToString(this.borderRadiusStyle));

    success
      ? this._notificationService.notifySuccess('Border radius copied to clipboard')
      : this._notificationService.notifyFailure('Something went wrong');
  }

  private _borderRadiusStyleToString(borderRadiusStyle: BorderRadius): string {
    return Object.keys(borderRadiusStyle)
      .map((k) => `${k}: ${this.borderRadiusStyle[k]};`)
      .join('\r\n');
  }
}
