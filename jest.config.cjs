// jest.config.cjs
module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': ['ts-jest', { 
            useESM: true,
        }]
    },
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^(\\.+)(\\.js)$': '$1.esm.ts',
    },
    maxWorkers: 'auto'
}