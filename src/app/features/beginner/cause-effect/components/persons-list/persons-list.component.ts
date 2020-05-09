import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Person } from '@kaeh/cause-effect/interfaces';
import { PersonStateService } from '@kaeh/cause-effect/state';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'kaeh-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonsListComponent implements OnInit, OnDestroy {
  @Input('dataset')
  public readonly dataset: ReadonlyArray<Person>;

  public selectedPerson: Person;

  private readonly _destroy$ = new Subject<void>();

  public constructor(private readonly _personStateService: PersonStateService) {}

  public ngOnInit(): void {
    this._initSelectedPersonChangeObservable();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }

  public selectPerson(person: Person): void {
    this._personStateService.selectedPerson = person;
  }

  private _initSelectedPersonChangeObservable(): void {
    this._personStateService.selectedPersonChange$.pipe(takeUntil(this._destroy$)).subscribe((p) => (this.selectedPerson = p));
  }
}
