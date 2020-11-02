module.exports = {
  verbose: true,
  projects: [
    {
      displayName: "test",
      setupFilesAfterEnv: [
        './jest.setup.js'
      ],
    },
    {
      runner: "jest-runner-eslint",
      displayName: "lint",
      testMatch: [
        "<rootDir>/src/**/*.js"
      ]
    }
  ],
};