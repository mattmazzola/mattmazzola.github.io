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
      LINKS_JSON_BLOB_URL: "http://localhost:3999/links.json",
      PROJECTS_JSON_BLOB_URL: "http://localhost:3999/projects.json",
    },
  },
});
