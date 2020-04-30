import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseMenu } from '@kaeh/shared/interfaces';
import { LevelsMenu } from './level-menu.const';

@Component({
  selector: 'kaeh-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  public title = 'App Ideas by Florin Pop, coded by Kaeh';
  public levelMenus = LevelsMenu;

  public constructor(private readonly _router: Router) {}

  public ngOnInit(): void {
    const sanitizedCurrentUrl = this._router.url.replace('/', '').split('/').pop();
    if (sanitizedCurrentUrl) {
      this.title = this.levelMenus.find((lm) => lm.content.has(sanitizedCurrentUrl)).content.get(sanitizedCurrentUrl).title;
    }
  }

  public navigateTo(menu: ExerciseMenu): void {
    this.title = menu.title;
    this._router.navigate(menu.routerLink);
  }
}
