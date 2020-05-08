import { Level } from '@kaeh/shared/enums';
import { ExerciseMenu } from '@kaeh/shared/interfaces';
import { SimpleMenu } from '@kaeh/shared/types';

export function generateSingleMenuItem(level: Level, title: string, path: string): ExerciseMenu {
  const fullPath = `${level}/${path}`;
  return {
    title,
    routerLink: [fullPath],
    markdownPath: fullPath,
  };
}

export function generateMenuItems(level: Level, menuItems: ReadonlyArray<SimpleMenu>): Map<string, ExerciseMenu> {
  const map = new Map<string, ExerciseMenu>();

  menuItems?.forEach((x) => map.set(x.path, generateSingleMenuItem(level, x.title, x.path)));

  return map;
}
