const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {
  constructor(page) {
    //Locators
    this.cartItem = page.locator('.cart_item');
    this.removeButton = page.getByText('Remove');
  }

  //Methods
  async removeFirstItemFromCart() {
    await this.removeButton.first().click();
  }

  async verifyCartPageItems() {
    return await this.cartItem.count();
  }
};
