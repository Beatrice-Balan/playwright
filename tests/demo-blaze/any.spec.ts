import { test, expect } from '@playwright/test';

test('Just a test', async({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(3000)
})