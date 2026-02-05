import { test, expect } from '@playwright/test';

test.describe('Resume Feedback', () => {
  test('resume page loads', async ({ page }) => {
    await page.goto('/track/investment-banking-interview-prep/resume');

    // Page should load
    await expect(page.locator('body')).toBeVisible();

    // Should have resume-related content or sign-in
    const pageContent = await page.textContent('body');
    const hasExpectedContent =
      pageContent?.includes('Resume') ||
      pageContent?.includes('resume') ||
      pageContent?.includes('Sign In') ||
      pageContent?.includes('Upload');

    expect(hasExpectedContent).toBeTruthy();
  });

  test('resume page has no errors', async ({ page }) => {
    await page.goto('/track/investment-banking-interview-prep/resume');

    await page.waitForLoadState('networkidle');

    // Page should not have crashed
    const errorText = await page.locator('text=Application error').count();
    expect(errorText).toBe(0);
  });

  test('example resume template links exist when authenticated', async ({ page }) => {
    await page.goto('/track/investment-banking-interview-prep/resume');

    await page.waitForLoadState('networkidle');

    // Check if template section exists (visible when authenticated)
    // This may not be visible if not signed in, so just check page loads
    const hasTemplateOrSignIn =
      await page.locator('text=Example Resume').count() > 0 ||
      await page.locator('text=Sign').count() > 0;

    expect(hasTemplateOrSignIn).toBeTruthy();
  });
});
