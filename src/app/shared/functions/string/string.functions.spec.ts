import { forceMaxLength, keepOnlyValidCharacters } from '@kaeh/shared/functions';

describe('string functions', () => {
  describe(keepOnlyValidCharacters.name, () => {
    it('should keep only valid characters from a string', () => {
      // Given a string
      const stringWithInvalidCharacters = 'i have 0invalid characters1.';
      // And some characters to remove
      const validCharacters = [0, 1];

      // When i call the method with those parameters
      const actual = keepOnlyValidCharacters(stringWithInvalidCharacters, ...validCharacters);

      // Then the invalid characters should have bee remove
      expect(actual).toEqual({ result: '01', hadErrors: true });
    });
  });

  describe(forceMaxLength.name, () => {
    it('should force max length on a too big string', () => {
      // Given a max length
      const maxLength = 8;
      // and a string overreaching this max length
      const string = 'i am waaaaaay too long';

      // When i call the method with those parameters
      const actual = forceMaxLength(string, maxLength);

      // Then the string should have been sliced to the given max length
      expect(actual).toEqual('i am waa');
    });

    it('should do nothing on valid string', () => {
      // Given a max length
      const maxLength = 8;
      // and a string under this max length
      const stringWith8Chars = "i'm good";
      const stringWithLessThan8Chars = 'good';

      // When i call the method with those parameters
      const actualWith8Chars = forceMaxLength(stringWith8Chars, maxLength);
      const actualWithLessThan8Chars = forceMaxLength(stringWithLessThan8Chars, maxLength);

      // Then the string should have been sliced to the given max length
      expect(actualWith8Chars).toBe("i'm good");
      expect(actualWithLessThan8Chars).toBe('good');
    });
  });
});
