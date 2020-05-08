import { BeginnerMenuRoutes, Level } from '@kaeh/shared/enums';
import { generateMenuItems } from '@kaeh/shared/functions';
import { SimpleMenu } from '@kaeh/shared/types';

const menuItems: ReadonlyArray<SimpleMenu> = [
  { title: 'Binary to Decimal', path: BeginnerMenuRoutes.BinaryToDecimal },
  { title: 'Border radius Previewer', path: BeginnerMenuRoutes.BorderRadiusPreviewer },
  { title: 'Calculator', path: BeginnerMenuRoutes.Calculator },
  { title: 'Cause-Effect', path: BeginnerMenuRoutes.CauseEffect },
  // { title: 'Christmas Lights', path: BeginnerMenuRoutes.ChristmasLights },
];

export const BeginnerMenu = generateMenuItems(Level.Beginner, menuItems);
