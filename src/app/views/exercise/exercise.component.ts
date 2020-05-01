import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AssetsService } from '@kaeh/core/services';
import { ExerciseStateService } from '@kaeh/core/states';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const HomePageTitle = 'App Ideas by Florin Pop, coded by Kaeh';
const HomePageMarkdownPath = 'README.md';

@Component({
  selector: 'kaeh-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseComponent implements OnInit {
  public title$: Observable<string>;
  public pageDescription$: Observable<string>;

  public constructor(
    private readonly _assetsService: AssetsService,
    private readonly _exerciseStateService: ExerciseStateService
  ) {}

  public ngOnInit(): void {
    this.title$ = this._exerciseStateService.selectedExerciseChange$.pipe(map((e) => (e ? e.title : HomePageTitle)));

    this.pageDescription$ = this._exerciseStateService.selectedExerciseChange$.pipe(
      map((e) => (e ? e.markdownPath : HomePageMarkdownPath)),
      switchMap((mp) => this._assetsService.getReadme(mp))
    );
  }
}
