import { chromium } from '@playwright/test'

// this will run once AFTER execution
 async function globalTeardown() {
    // Set browser contex and page
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

    await page.goto('https://playwright.dev/')

    console.log('This is GLOBAL TEARDOWN Running!')

    // then from here you can Delete all the cookies
}

export default globalTeardown