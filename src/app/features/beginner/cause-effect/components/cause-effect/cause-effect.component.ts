import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PersonsList } from '@kaeh/cause-effect/consts';

@Component({
  selector: 'kaeh-cause-effect',
  templateUrl: './cause-effect.component.html',
  styleUrls: ['./cause-effect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CauseEffectComponent {
  public personsList = PersonsList;
}
