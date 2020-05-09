import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Person } from '@kaeh/cause-effect/interfaces';
import { PersonStateService } from '@kaeh/cause-effect/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'kaeh-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonDetailsComponent implements OnInit {
  public person$: Observable<Person>;
  public constructor(private readonly _personStateService: PersonStateService) {}

  public ngOnInit(): void {
    this.person$ = this._personStateService.selectedPersonChange$;
  }
}
