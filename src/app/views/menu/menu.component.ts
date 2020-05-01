import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseStateService } from '@kaeh/core/states';
import { ExerciseMenu } from '@kaeh/shared/interfaces';
import { LevelsMenu } from './level-menu.const';

@Component({
  selector: 'kaeh-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  public levelMenus = LevelsMenu;

  public constructor(
    private readonly _router: Router,
    private readonly _exerciseStateService: ExerciseStateService,
    private readonly _location: Location
  ) {}

  public ngOnInit(): void {
    const sanitizedCurrentUrl = this._location.path().replace('/', '').split('/').pop();
    const currentMenu = LevelsMenu.find((lm) => lm.content.has(sanitizedCurrentUrl))?.content.get(sanitizedCurrentUrl);
    this._exerciseStateService.selectedExercise = currentMenu;
  }

  public navigateTo(menu: ExerciseMenu): void {
    this._exerciseStateService.selectedExercise = menu;
    this._router.navigate(menu.routerLink);
  }
}
