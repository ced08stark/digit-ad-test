module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(my-module)/)",
  ],
  // Autres configurations Jest...
};

