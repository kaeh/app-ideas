import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Person } from '@kaeh/cause-effect/interfaces';
import { PersonStateService } from '@kaeh/cause-effect/state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'kaeh-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonsListComponent implements OnInit {
  @Input('dataset')
  public readonly dataset: ReadonlyArray<Person>;

  public selectedPerson: Person;

  public constructor(private readonly _personStateService: PersonStateService) {}

  public ngOnInit(): void {
    this._initSelectedPersonChangeObservable();
  }

  public selectPerson(person: Person): void {
    this._personStateService.selectedPerson = person;
  }

  private _initSelectedPersonChangeObservable(): void {
    this._personStateService.selectedPersonChange$.pipe(untilDestroyed(this)).subscribe((p) => (this.selectedPerson = p));
  }
}
