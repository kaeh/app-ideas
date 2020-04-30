import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Base component that will emit the destroy subject on component OnDestroy life-cycle.
 *
 * This is used to automatically destroy subscription that will call takeUntil(this.destroy$)
 */
export class BaseComponent implements OnDestroy {
  protected readonly _destroy$ = new Subject<void>();

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}
