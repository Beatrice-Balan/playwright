import { test, expect } from '@playwright/test'

test('test Visual regression', async({ page }) => {
    await page.goto('https://www.techglobal-training.com/')

    await page.waitForTimeout(2000)

    await expect(page).toHaveScreenshot({
        fullPage: true
    })
})

