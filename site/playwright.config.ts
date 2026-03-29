import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./tests",
  globalSetup: "./tests/global-setup.ts",
  use: {
    baseURL: "http://localhost:3100",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm start",
    port: 3100,
    reuseExistingServer: false,
    env: {
      PORT: "3100",
    },
  },
});
