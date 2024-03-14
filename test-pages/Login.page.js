const { expect } = require('@playwright/test');
const { config } = require('process');

exports.LoginPage = class LoginPage {
  constructor(page) {
    //Locators
    this.page = page;
    this.emailInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.locator('#login-button');
  }

  //Methods
  async goto() {
    await this.page.goto('/');
  }

  async performLogin(userName, password) {
    await this.emailInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
};
