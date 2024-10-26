import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Suite de pruebas", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.navigate();
    loginPage.LoginWithNewUser();
  });

  test("Add task", async ({ page }) => {
    const todoInjector = await page.getByPlaceholder("What needs to be done?");
    await todoInjector.fill("Eat salchipapas");
    await todoInjector.press("Enter");
    await expect(page.getByText("Eat salchipapas")).toBeVisible();
  });

  test("Complete task", async ({ page }) => {
    const itemSelector = "div.item.card-panel.hoverable";
    const itemHandle = await page.locator(
      `${itemSelector}:has-text("Help a complete stranger")`
    );

    await itemHandle
      .locator('i.material-icons:text("check_box_outline_blank")')
      .click();
    const parentElement = itemHandle.first();
    await expect(parentElement).toHaveAttribute("data-done", "false", {
      timeout: 1000,
    });
  });

  test("Clear Task", async ({ page }) => {
    const itemSelector = "div.item.card-panel.hoverable";
    const itemHandle = await page.locator(
      `${itemSelector}:has-text("Help a complete stranger")`
    );
    await itemHandle.hover();

    const editBtns = itemHandle.locator("span.edit-btns.right");
    await expect(editBtns).toBeVisible({ timeout: 4000 });

    await editBtns
      .locator("a.right.button.delete-btn i.material-icons")
      .click();

    await expect(itemHandle).toBeHidden({ timeout: 4000 });
  });
});
