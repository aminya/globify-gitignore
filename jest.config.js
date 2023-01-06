/** @type {import("ts-jest").JestConfigWithTsJest} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  collectCoverage: true,
}
