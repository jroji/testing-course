module.exports = {
  projects: [
    {
      displayName: "test",
      verbose: true,
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