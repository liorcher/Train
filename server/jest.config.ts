/** @type {import('ts-jest/dist/types').InitialOptionsTsJest}*/
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    setupFiles: ['<rootDir>/tests/setup.ts'],
};
