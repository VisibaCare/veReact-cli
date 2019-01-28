module.exports = {
  "setupFiles": ["./src/setupTests.js"],
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "moduleDirectories": [
    "./node_modules",
    "./src"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
};
