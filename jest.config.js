import { pathsToModuleNameMapper } from 'ts-jest/utils';
import * as tsconfig from './tsconfig.json';

module.exports = {
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};
