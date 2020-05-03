import { BeginnerMenuRoutes, Level } from '@kaeh/shared/enums';
import { generateMenuItems } from '@kaeh/shared/functions';
import { SimpleMenu } from '@kaeh/shared/types';

const menuItems: SimpleMenu[] = [
  { title: 'Binary to Decimal', path: BeginnerMenuRoutes.BinaryToDecimal },
  { title: 'Border radius Previewer', path: BeginnerMenuRoutes.BorderRadiusPreviewer },
  { title: 'Calculator', path: BeginnerMenuRoutes.Calculator },
];

export const BeginnerMenu = generateMenuItems(Level.Beginner, menuItems);
