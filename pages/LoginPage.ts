import { Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("http://127.0.0.1:5000");
  }

  async LoginWithNewUser() {
    await this.page
      .getByRole("navigation")
      .getByRole("link", { name: "Login" })
      .click();
    await this.page.getByText("Get a test account").click();
    await this.page.waitForTimeout(3000);
    await this.page.locator("#login-btn").click();
  }
}
