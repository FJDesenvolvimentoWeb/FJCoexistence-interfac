module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mjs', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx|js|mjs)$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!@angular|rxjs)'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts', 'jest-preset-angular/setup-jest'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
};
