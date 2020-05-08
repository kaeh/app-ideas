import { Injectable } from '@angular/core';
import { Person } from '@kaeh/cause-effect/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonStateService {
  private readonly _selectedPerson$ = new BehaviorSubject<Person>(undefined);
  public readonly selectedPersonChange$ = this._selectedPerson$.asObservable();

  public set selectedPerson(value: Person) {
    this._selectedPerson$.next(value);
  }
}
