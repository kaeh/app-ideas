import {
  forceMaxLength,
  getLastCharacter,
  getLastCharacterAsNumber,
  keepOnlyValidCharacters,
  removeLastCharacter,
} from '@kaeh/shared/functions';

describe('string functions', () => {
  describe(keepOnlyValidCharacters.name || 'keepOnlyValidCharacters', () => {
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

  describe(forceMaxLength.name || 'forceMaxLength', () => {
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

  describe(getLastCharacter.name || 'getLastCharacter', () => {
    it('should get the last character of a string', () => {
      // Given a string
      const str = 'Hello there !!';
      // When i call the getLastCharacter function
      const actual = getLastCharacter(str);
      // Then the result should be the last character of the string
      expect(actual).toBe('!');
    });

    it('should return an empty string if input string is null', () => {
      // Given a null string
      const str = null;
      // When i call the getLastCharacter function
      const actual = getLastCharacter(str);
      // Then the result should be the last character of the string
      expect(actual).toBe('');
    });

    it('should return an empty string if input string is undefined', () => {
      // Given a undefined string
      const str = undefined;
      // When i call the getLastCharacter function
      const actual = getLastCharacter(str);
      // Then the result should be the last character of the string
      expect(actual).toBe('');
    });

    it('should return an empty string if input string is empty', () => {
      // Given an empty string
      const str = '';
      // When i call the getLastCharacter function
      const actual = getLastCharacter(str);
      // Then the result should be the last character of the string
      expect(actual).toBe('');
    });
  });

  describe(getLastCharacterAsNumber.name || 'getLastCharacterAsNumber', () => {
    it('should get the last character of a string as a number', () => {
      // Given a string
      const str = 'Hello there !!1';
      // When i call the getLastCharacterAsNumber function
      const actual = getLastCharacterAsNumber(str);
      // Then the result should be the last character of the string
      expect(actual).toBe(1);
    });

    it('should return a 0 if input string is null', () => {
      // Given a null string
      const str = null;
      // When i call the getLastCharacterAsNumber function
      const actual = getLastCharacterAsNumber(str);
      // Then the result should be the last character of the string
      expect(actual).toBe(0);
    });

    it('should return a 0 if input string is undefined', () => {
      // Given a undefined string
      const str = undefined;
      // When i call the getLastCharacterAsNumber function
      const actual = getLastCharacterAsNumber(str);
      // Then the result should be the last character of the string
      expect(actual).toBe(0);
    });

    it('should return a 0 if input string is empty', () => {
      // Given an empty string
      const str = '';
      // When i call the getLastCharacterAsNumber function
      const actual = getLastCharacterAsNumber(str);
      // Then the result should be the last character of the string
      expect(actual).toBe(0);
    });
  });

  describe(removeLastCharacter.name || 'removeLastCharacter', () => {
    it('should remove the last character of the string', () => {
      // Given a string
      const str = 'Hello there !!';
      // When i call the removeLastCharacter function
      const actual = removeLastCharacter(str);
      // Then the result should be the last character of the string
      expect(actual).toBe('Hello there !');
    });

    it('should return an empty string if input string is null', () => {
      // Given a null string
      const str = null;
      // When i call the removeLastCharacter function
      const actual = removeLastCharacter(str);
      // Then the result should be the last character of the string
      expect(actual).toBe('');
    });

    it('should return an empty string if input string is undefined', () => {
      // Given a undefined string
      const str = undefined;
      // When i call the removeLastCharacter function
      const actual = removeLastCharacter(str);
      // Then the result should be the last character of the string
      expect(actual).toBe('');
    });

    it('should return an empty string if input string is empty', () => {
      // Given an empty string
      const str = '';
      // When i call the removeLastCharacter function
      const actual = removeLastCharacter(str);
      // Then the result should be the last character of the string
      expect(actual).toBe('');
    });
  });
});
