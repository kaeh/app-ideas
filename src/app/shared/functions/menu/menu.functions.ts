import { Level } from '@kaeh/shared/enums';
import { ExerciseMenu } from '@kaeh/shared/interfaces';
import { SimpleMenu } from '@kaeh/shared/types';

export function generateMenuItem(level: Level, title: string, path: string): ExerciseMenu {
  const fullPath = `${level}/${path}`;
  return {
    title,
    routerLink: [fullPath],
    markdownPath: fullPath,
  };
}

export function generateMenuItems<T>(menuItems: SimpleMenu<T>[]): Map<T, ExerciseMenu> {
  const map = new Map<T, ExerciseMenu>();

  menuItems.forEach((x) => map.set(x.path, generateMenuItem(Level.Beginner, x.title, (x.path as unknown) as string)));

  return map;
}
