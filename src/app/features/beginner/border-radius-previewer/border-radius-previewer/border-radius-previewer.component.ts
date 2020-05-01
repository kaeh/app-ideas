import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kaeh-border-radius-previewer',
  templateUrl: './border-radius-previewer.component.html',
  styleUrls: ['./border-radius-previewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BorderRadiusPreviewerComponent {}
