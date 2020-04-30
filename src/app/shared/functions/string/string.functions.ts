export function keepOnlyValidCharacters(value: string, ...validCharacters: (string | number)[]): string {
  const validCharacterRegExp = new RegExp(`[^(${validCharacters.join('|')})]*`, 'g');
  return value.replace(validCharacterRegExp, '');
}

export const forceMaxLength = (value: string, maxLength: number): string => value.slice(0, maxLength);
