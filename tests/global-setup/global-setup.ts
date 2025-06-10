import { chromium } from '@playwright/test'

// this will run once BEFORE execution
async function globalSetup() {
    // Set browser contex and page
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

    await page.goto('https://playwright.dev/')

    console.log('This is GLOBAL SET UP Running!')

    // then from here you can Login and store auth state
}


export default globalSetup
