import { expect, Page } from "@playwright/test";

export class TodoListPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  
}