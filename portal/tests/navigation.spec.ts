import { test, expect } from '@playwright/test';

test.describe('Course Navigation', () => {
  test('landing page loads and shows featured course', async ({ page }) => {
    await page.goto('/');

    // Check hero section renders
    await expect(page.locator('h1')).toContainText('Master Your Finance Interview');

    // Check featured course card exists
    const featuredCard = page.locator('.featured-card');
    await expect(featuredCard).toBeVisible();
    await expect(featuredCard).toContainText('Investment Banking Interview Prep');
  });

  test('can navigate from landing to track page', async ({ page }) => {
    await page.goto('/');

    // Click featured course
    await page.click('.featured-card');

    // Should be on track page
    await expect(page).toHaveURL(/\/track\/investment-banking-interview-prep/);

    // Track page should show modules
    await expect(page.locator('h1')).toContainText('Investment Banking Interview Prep');
  });

  test('can navigate from track to module to lesson', async ({ page }) => {
    // Go directly to track page
    await page.goto('/track/investment-banking-interview-prep');

    // Click first module
    const firstModule = page.locator('[href*="/01-fit-story-behavioral"]').first();
    await expect(firstModule).toBeVisible();
    await firstModule.click();

    // Should be on module page
    await expect(page).toHaveURL(/\/01-fit-story-behavioral/);

    // Click first lesson
    const firstLesson = page.locator('[href*="/01-why-investment-banking"]').first();
    await expect(firstLesson).toBeVisible();
    await firstLesson.click();

    // Should be on lesson page with content
    await expect(page).toHaveURL(/\/01-why-investment-banking/);
    await expect(page.locator('article')).toBeVisible();
  });

  test('lesson page has navigation controls', async ({ page }) => {
    // Go to a middle lesson
    await page.goto('/track/investment-banking-interview-prep/01-fit-story-behavioral/02-walking-through-resume');

    // Should have prev/next navigation
    const prevLink = page.locator('text=Previous');
    const nextLink = page.locator('text=Next');

    await expect(prevLink).toBeVisible();
    await expect(nextLink).toBeVisible();
  });
});
