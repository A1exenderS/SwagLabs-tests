const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.locator("#login-button").click();
});

test.describe("two simple tests", () => {
  test("Test 1 - Perform Login", async ({ page }) => {
    await expect(page.locator(".title")).toBeVisible;
  });
});
