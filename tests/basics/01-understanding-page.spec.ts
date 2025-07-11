import { chromium, test } from "@playwright/test";

// this is how you set up a page from scratch, the { page } part
test('Setting a page', async() => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.techglobal-training.com/');

  const newPage = await context.newPage();
  await newPage.goto('https://playwright.dev/docs/api/class-page');
});


test('Visiting a page', async({ page }) => {
  await page.goto('https://www.techglobal-training.com/');
});