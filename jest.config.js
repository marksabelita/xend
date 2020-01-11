module.exports = {
  transform: {
      "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/test/integration/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testPathIgnorePatterns: ["/lib/", "/node_modules/", '/unit/'],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: false,
  testEnvironment: 'node'
};