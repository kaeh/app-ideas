import { Level } from '@kaeh/shared/enums';
import { LevelMenu } from '@kaeh/shared/interfaces';
import { AdvancedMenu } from './advanced-menu.const';
import { BeginnerMenu } from './beginner-menu.const';
import { IntermediateMenu } from './intermediate-menu.const';

export const LevelsMenu = [
  {
    level: Level.Beginner,
    title: 'Beginner',
    content: BeginnerMenu,
  },

  {
    level: Level.Intermediate,
    title: 'Intermediate',
    content: IntermediateMenu,
  },

  {
    level: Level.Advanced,
    title: 'Advanced',
    content: AdvancedMenu,
  },
] as LevelMenu[];
