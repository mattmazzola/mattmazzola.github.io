import { expect, test } from "@playwright/test"

test.describe("Homepage", () => {
  test("has correct page title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Matt Mazzola Projects/);
  });

  test("header renders Matt Mazzola name", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 }).or(
      page.getByText("Matt Mazzola", { exact: true }).first()
    )).toBeVisible();
  });

  test("projects grid is present", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".projects")).toBeVisible();
  });

  test("fixture project names render", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Smoke Test Project")).toBeVisible();
    await expect(page.getByText("Another Project")).toBeVisible();
  });

  test("project descriptions render", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("A test project used by smoke tests")
    ).toBeVisible();
  });

  test("links render in header or footer", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: "mattmazzola" }).first()
    ).toBeVisible();
  });
});

test.describe("Routing", () => {
  test("unknown routes redirect to homepage", async ({ page }) => {
    await page.goto("/some-unknown-route-that-does-not-exist");
    await expect(page).toHaveURL("/");
  });

  test("homepage responds with 200", async ({ request }) => {
    const response = await request.get("/");
    expect(response.status()).toBe(200);
  });
});
