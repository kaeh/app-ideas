import { Level } from '@kaeh/shared/enums';
import { ExerciseMenu, Menu } from '@kaeh/shared/interfaces';

export interface LevelMenu extends Menu {
  level: Level;
  content: Map<string, ExerciseMenu>;
}
