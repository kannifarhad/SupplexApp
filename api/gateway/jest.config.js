module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testResultsProcessor: "jest-junit",
	testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
};