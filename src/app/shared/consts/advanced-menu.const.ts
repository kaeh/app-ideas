import { Level } from '@kaeh/shared/enums';
import { generateMenuItems } from '@kaeh/shared/functions';
import { SimpleMenu } from '@kaeh/shared/types';

const menuItems: ReadonlyArray<SimpleMenu> = [];

export const AdvancedMenu = generateMenuItems(Level.Advanced, menuItems);
