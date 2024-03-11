const { test, expect } = require("@playwright/test");

test.describe("two simple tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.click("#login-button");
  });

  test("Test 1 - Perform Login", async ({ page }) => {
    await expect(page.locator(".title")).toBeVisible;
    const inventoryItem = await page.$$(".inventory_item");
    expect(inventoryItem.length).toBeGreaterThan(1);
  });

  test("Test 2 - Add product to the cart", async ({ page }) => {
    await page.click("#add-to-cart-sauce-labs-backpack");

    const shoppingCartBadgeText = page
      .locator(".shopping_cart_badge")
      .textContent();

    expect(await shoppingCartBadgeText).toBe("1");

    await page.click(".shopping_cart_link");
    const cartItem = await page.textContent(".inventory_item_name");
    expect(cartItem).toBe("Sauce Labs Backpack");

    await page.click("#remove-sauce-labs-backpack");

    const shoppingCartBadge = page.locator(".shopping_cart_badge");
    expect(await shoppingCartBadge.count()).toBe(0);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
