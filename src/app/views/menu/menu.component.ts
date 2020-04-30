import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Level } from '@kaeh/shared/enums';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type LevelCard = {
  title: string;
  content: string;
  routerLink: string[];
};

@Component({
  selector: 'kaeh-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  public displayBackIcon$: Observable<boolean>;
  public title$: Observable<string>;
  public cards$: Observable<LevelCard[]>;

  public constructor(private readonly _router: Router, private readonly _activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    const level$ = this._activatedRoute.paramMap.pipe(map((paramMap) => paramMap.get('level') as Level));
    this.displayBackIcon$ = level$.pipe(map((level) => !!level));
    this.title$ = level$.pipe(map((level) => this._setTitle(level)));
    this.cards$ = level$.pipe(map((level) => this._setCards(level)));
  }

  public navigateTo(route: string[]): void {
    this._router.navigate(route);
  }

  public navigateBack(): void {
    this._router.navigate(['..'], { relativeTo: this._activatedRoute });
  }

  private _setTitle(level: Level): string {
    switch (level) {
      case Level.Beginner:
        return 'Beginner';
      case Level.Intermediate:
        return 'Intermediate';
      case Level.Advanced:
        return 'Advanced';
      default:
        return 'Levels';
    }
  }

  private _setCards(level: Level): LevelCard[] {
    switch (level) {
      case Level.Beginner:
      case Level.Intermediate:
      case Level.Advanced:
        console.error('Not implemented yet.');
        return [];
      default:
        return [
          {
            title: 'Beginner',
            content:
              'Developers in the early stages of their learning journey. Those who are typically focused on creating user-facing applications.',
            routerLink: ['.', Level.Beginner],
          },
          {
            title: 'Intermediate',
            content:
              'Developers at an intermediate stage of learning and experience. They are comfortable in UI/UX, using development tools, and building apps that use API services.',
            routerLink: ['.', Level.Intermediate],
          },
          {
            title: 'Advanced',
            content:
              'Developers who have all of the above, and are learning more advanced techniques like implementing backend applications and database services.',
            routerLink: ['.', Level.Advanced],
          },
        ];
    }
  }
}
