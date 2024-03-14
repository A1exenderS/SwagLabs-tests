const { expect } = require('@playwright/test');

exports.InventoryPage = class InventoryPage {
  constructor(page) {
    //Locators
    this.productTitle = page.locator('.title');
    this.inventoryItem = page.locator('.inventory_item');
    this.itemAddToCartButton = page.locator('[id^="add-to-cart"]');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  //Methods
  async getNumberOfItemsOnCartBadge() {
    return await this.shoppingCartBadge.textContent();
  }
};
