import { test, expect } from '@playwright/test';

test('extension popup opens', async ({ page }) => {
  // Navigate to a test page
  await page.goto('https://example.com');
  
  // Open the extension popup
  await page.click('[data-testid="extension-icon"]');
  
  // Verify popup content
  await expect(page.locator('h1')).toContainText('FixedPoint');
  await expect(page.locator('input')).toBeVisible();
});

test('extension processes URL', async ({ page }) => {
  // Navigate to a test page
  await page.goto('https://example.com');
  
  // Open the extension popup
  await page.click('[data-testid="extension-icon"]');
  
  // Enter a URL
  await page.fill('input', 'https://example.com/test');
  
  // Submit the form
  await page.click('button[type="submit"]');
  
  // Verify processing
  await expect(page.locator('.success-message')).toBeVisible();
}); 