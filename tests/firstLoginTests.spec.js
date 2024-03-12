const { test, expect } = require("@playwright/test");

test.describe("two simple tests", () => {
  test.beforeEach(async ({ page }) => {
    const emailInput = page.getByPlaceholder("Username");
    const passwordInput = page.getByPlaceholder("Password");
    const loginButton = page.locator("#login-button");

    await page.goto("https://www.saucedemo.com/");
    await emailInput.fill("standard_user");
    await passwordInput.fill("secret_sauce");
    await loginButton.click();
  });

  test("Test 1 - Perform Login", async ({ page }) => {
    const productTitle = page.locator(".title");
    const inventoryItem = page.locator(".inventory_item");

    expect(await productTitle).toBeVisible;
    expect(await inventoryItem.count()).toBeGreaterThan(1);
  });

  test("Test 2 - Add product to the cart", async ({ page }) => {
    const addToCartSLBButton = page.locator("#add-to-cart-sauce-labs-backpack");
    const shoppingCartBadge = page.locator(".shopping_cart_badge");
    const cartItem = page.textContent(".inventory_item_name");
    const shoppingCartLink = page.locator(".shopping_cart_link");

    await addToCartSLBButton.click();
    expect(await shoppingCartBadge.textContent()).toBe("1");
    await shoppingCartLink.click();
    expect(await cartItem).toBe("Sauce Labs Backpack");
    await page.click("#remove-sauce-labs-backpack");
    expect(await shoppingCartBadge.count()).toBe(0);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
