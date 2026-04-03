// tests/e2e/basic-navigation.spec.js
import { test, expect } from '@playwright/test';

const HOME_URL = process.env.E2E_BASE_URL || 'http://localhost:4173/maktabati/';

test('homepage loads and navigation works', async ({ page }) => {
  await page.goto(HOME_URL);

  // Check title
  await expect(page).toHaveTitle(/Maktabati/);

  // Check main heading
  await expect(page.locator('h1').first()).toContainText('Maktabati');

  // Check navigation links exist
  await expect(page.locator('nav a:has-text("📦 Projects")')).toBeVisible();
  await expect(page.locator('nav a:has-text("⚙️ Workflows")')).toBeVisible();
  await expect(page.locator('nav a:has-text("📚 Guides")')).toBeVisible();

  // Test navigation to projects
  await page.click('nav a:has-text("📦 Projects")');
  await expect(page).toHaveURL(/.*projects/);
  await expect(page.locator('h1')).toContainText('Projects');
});

test('quick links work', async ({ page }) => {
  await page.goto(HOME_URL);

  // Test quick link to projects
  await page.click('text=Browse Projects');
  await expect(page).toHaveURL(/.*projects/);
});

test('footer is present', async ({ page }) => {
  await page.goto(HOME_URL);

  // Check footer content
  await expect(page.locator('footer')).toContainText('Released under MIT License');
  await expect(page.locator('footer')).toContainText('Copyright © 2026 Ayoub Etters');
});