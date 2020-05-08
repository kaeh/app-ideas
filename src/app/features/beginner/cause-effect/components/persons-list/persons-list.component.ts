import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kaeh-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonsListComponent {}
