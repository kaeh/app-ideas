import { Level } from '@kaeh/shared/enums';
import { generateMenuItems, generateSingleMenuItem } from './menu.functions';

describe('Menu functions', () => {
  describe(generateSingleMenuItem.name, () => {
    it('should generate a menu item', () => {
      // When the method is called with parameters
      const actual = generateSingleMenuItem(Level.Beginner, 'a title', 'a-path');
      // Then a menu item should have been generated
      expect(actual).toBeTruthy();
    });

    it('should prepend given level to routerLink', () => {
      // Given i want a menu item with a specific path
      const path = 'a-path';
      // and a specific level
      const level = Level.Beginner;

      // When the method is called with parameters
      const actual = generateSingleMenuItem(Level.Beginner, 'a title', path);

      // Then the routerLink generated should have been "level/path"
      const expected = [`${level}/${path}`];
      expect(actual.routerLink).toEqual(expected);
    });

    it('should prepend given level to markdownPath', () => {
      // Given i want a menu item with a specific path
      const path = 'a-path';
      // and a specific level
      const level = Level.Beginner;

      // When the method is called with parameters
      const actual = generateSingleMenuItem(Level.Beginner, 'a title', path);

      // Then the markdownPath generated should have been "level/path"
      const expected = `${level}/${path}`;
      expect(actual.markdownPath).toEqual(expected);
    });
  });

  describe(generateMenuItems.name, () => {
    it('should generate a map of menu item when menuItem is empty', () => {
      // When the method is called with parameters
      const actual = generateMenuItems(Level.Beginner, []);
      // Then a menu item map should have been generated
      expect(actual).toBeTruthy();
    });

    it('should generate a map of menu item is falsy', () => {
      // When the method is called with parameters
      const actual = generateMenuItems(Level.Beginner, undefined);
      // Then a menu item map should have been generated
      expect(actual).toBeTruthy();
    });

    it('should generate a map of menu item is defined and not empty', () => {
      // When the method is called with parameters
      const actual = generateMenuItems(Level.Beginner, [
        { path: 'a-path', title: 'a-title' },
        { path: 'another-path', title: 'another-title' },
      ]);
      // Then a menu item map should have been generated
      expect(actual.get('a-path')).toEqual({
        title: 'a-title',
        routerLink: ['beginner/a-path'],
        markdownPath: 'beginner/a-path',
      });
      expect(actual.get('another-path')).toEqual({
        title: 'another-title',
        routerLink: ['beginner/another-path'],
        markdownPath: 'beginner/another-path',
      });
    });
  });
});
