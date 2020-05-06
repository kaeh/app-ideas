import * as R from 'ramda';

type keepOnlyValidCharactersResult = {
  result: string;
  hadErrors: boolean;
};

export function keepOnlyValidCharacters(value: string, ...validCharacters: (string | number)[]): keepOnlyValidCharactersResult {
  const validCharacterRegExp = new RegExp(`[^(${validCharacters.join('|')})]*`, 'g');
  const result = value.replace(validCharacterRegExp, '');
  const hadErrors = result !== value;

  return { result, hadErrors };
}

export const forceMaxLength = (value: string, maxLength: number): string => value.slice(0, maxLength);
export const getLastCharacter = (str: string): string => str?.slice(-1) ?? '';
export const getLastCharacterAsNumber: (str: string) => number = R.pipe(getLastCharacter, Number);
export const removeLastCharacter = (str: string): string => str?.slice(0, -1) ?? '';
