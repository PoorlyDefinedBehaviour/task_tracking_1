module.exports = {
  rootDir: "./src",
  testEnvironment: "node",
  testRegex: ".spec.js$",
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["js", "json", "node"],
  moduleDirectories: ["node_modules", "src"],
  verbose: false,
  silent: false,
}
