/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: ["node_modules", "<rootDir>"],
    // TODO Здесь указаны `path-aliases`, те же что и в `tsconfig.json`
    // Нужно генерировать их на основании `tsconfig.json`, чтобы убрать дублирование
    reporters:
        [
            "default",
            [
                "jest-stare",
                {
                    "resultDir": "test/report",
                }
            ]
        ],
    coverageReporters: ['clover', 'json', 'lcov', ['text', {skipFull: true}]],
};
