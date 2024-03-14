const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../test-pages/Login.page.js');
const { InventoryPage } = require('../test-pages/Inventory.page.js');
const { CartPage } = require('../test-pages/Cart.page.js');

test.describe('two simple tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.performLogin('standard_user', 'secret_sauce');
  });

  test('Test 1 - Perform Login', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await expect(inventoryPage.productTitle).toBeVisible();
    await expect(inventoryPage.shoppingCartLink).toBeVisible();
    expect(await inventoryPage.inventoryItem.count()).toBeGreaterThanOrEqual(1);
  });

  test('Test 2 - Add product to the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.itemAddToCartButton.first().click();
    expect(await inventoryPage.getNumberOfItemsOnCartBadge()).toBe('1');
    await inventoryPage.shoppingCartLink.click();
    expect(await cartPage.cartItem.textContent()).toContain('Sauce Labs Backpack');
    await cartPage.removeFirstItemFromCart();
    expect(await cartPage.verifyCartPageItems()).toBe(0);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
