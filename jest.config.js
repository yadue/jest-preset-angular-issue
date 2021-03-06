require('jest-preset-angular/ngcc-jest-processor');
const preset = require('jest-preset-angular/jest-preset');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

process.env.TZ = 'Europe/Warsaw';

module.exports = {
    preset: 'jest-preset-angular',
    // testRunner: 'jest-jasmine2',
    testMatch: ['**/*.spec.ts'],
    maxWorkers: '50%',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
    },
    testResultsProcessor: './node_modules/jest-junit-reporter',
    collectCoverageFrom: ['src/**/*.ts'],
    coverageReporters: ['json', 'html'],
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es|lodash-decorators-esm|date-fns|@uppy/utils)'],
    globals: {
        'ts-jest': {
            ...preset.globals['ts-jest'],
            isolatedModules: true,
            tsconfig: './tsconfig.spec.json',
        },
    },
};
