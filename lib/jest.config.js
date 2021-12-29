module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '.+\\.css$': '<rootDir>/src/styleMock.ts',
  },
  testMatch: ['**/*.(test|spec).(ts|tsx|js|jsx)'],
};
