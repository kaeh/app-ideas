import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kaeh-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonDetailsComponent {}
