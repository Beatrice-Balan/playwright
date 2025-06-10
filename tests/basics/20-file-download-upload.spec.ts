import { test, expect } from '@playwright/test';
import fs from 'fs'; 
import path from 'path';

// fas and path are Node JS dependency file system

test.describe('File Upload & Download', () => {
  test.beforeEach(async({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend/file-download');
  });


  test('File Download', async ({ page }) => {

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#file_download').click()
    ]);

    const downloadPath = 'downloads/' + download.suggestedFilename();
    await download.saveAs(downloadPath);
    
    expect(fs.existsSync(downloadPath)).toBeTruthy();
  });


  test('File Upload', async({ page }) => {
    await page.locator('#file_upload').setInputFiles('downloads/SampleText.txt')

    await page.locator('#file_submit').click()
    await expect(page.locator('#result')).toContainText('SampleText.txt')
    
  })

});


