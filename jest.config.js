const config = {
  verbose: true,
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/mocks/'
  ],
}

module.exports = config
