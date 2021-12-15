/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // 支持es2019
  globals: {
    'ts-jest': {
      tsConfig: {
        target: 'ES2019'
      }
    }
  }
};