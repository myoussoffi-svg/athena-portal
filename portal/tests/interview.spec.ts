import { test, expect } from '@playwright/test';

test.describe('Interview Simulator', () => {
  test('interview landing page loads', async ({ page }) => {
    await page.goto('/track/investment-banking-interview-prep/interview');

    // Page should load (may show sign-in prompt or landing)
    // Check for common elements that indicate the page rendered
    await expect(page.locator('body')).toBeVisible();

    // Should have some content about interviews or sign-in
    const pageContent = await page.textContent('body');
    const hasExpectedContent =
      pageContent?.includes('Interview') ||
      pageContent?.includes('Sign In') ||
      pageContent?.includes('interview');

    expect(hasExpectedContent).toBeTruthy();
  });

  test('interview page has proper structure', async ({ page }) => {
    await page.goto('/track/investment-banking-interview-prep/interview');

    // Wait for page to stabilize
    await page.waitForLoadState('networkidle');

    // Page should not have crashed (no error boundary)
    const errorText = await page.locator('text=Application error').count();
    expect(errorText).toBe(0);
  });
});
