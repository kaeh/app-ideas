import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from '@kaeh/core/services';
import { ExerciseMenu } from '@kaeh/shared/interfaces';
import { Observable } from 'rxjs';
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
  public pageDescription$: Observable<string>;

  public constructor(private readonly _router: Router, private readonly _assetsService: AssetsService) {}

  public ngOnInit(): void {
    const sanitizedCurrentUrl = this._router.url.replace('/', '').split('/').pop();
    if (sanitizedCurrentUrl) {
      const currentMenu = this.levelMenus.find((lm) => lm.content.has(sanitizedCurrentUrl)).content.get(sanitizedCurrentUrl);

      this.title = currentMenu.title;
      this.pageDescription$ = this._assetsService.getReadme(currentMenu.markdownPath);
    } else {
      this.pageDescription$ = this._assetsService.getMainReadme();
    }
  }

  public navigateTo(menu: ExerciseMenu): void {
    this.title = menu.title;
    this._router.navigate(menu.routerLink);
  }
}
