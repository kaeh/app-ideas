import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kaeh-cause-effect',
  templateUrl: './cause-effect.component.html',
  styleUrls: ['./cause-effect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CauseEffectComponent {}
