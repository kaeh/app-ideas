import { Injectable } from '@angular/core';
import { ExerciseMenu } from '@kaeh/shared/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseStateService {
  private readonly _selectedExercise$ = new BehaviorSubject<ExerciseMenu>(undefined);
  public readonly selectedExerciseChange$ = this._selectedExercise$.asObservable();

  public set selectedExercise(value: ExerciseMenu) {
    this._selectedExercise$.next(value);
  }
}
