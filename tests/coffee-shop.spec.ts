import { test, expect } from '@playwright/test';

const BASE_URL = 'https://coffee-cart.app/';

test.describe('Coffee Shop Testing', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');
  });

  test('Coffee TC-001: add Espresso to cart', async ({ page }) => {
    await page.locator('[data-test="Espresso"]').click();

    await expect(page.locator('[aria-label="Cart page"]')).toContainText('1');
    await expect(page.getByText('Total: $10.00')).toBeVisible();
  });

  test('Coffee TC-002: add two drinks and verify total', async ({ page }) => {
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Americano"]').click();

    await expect(page.locator('[aria-label="Cart page"]')).toContainText('2');
    await expect(page.getByText('Total: $17.00')).toBeVisible();
  });

  test('Coffee TC-003: guest can complete checkout', async ({ page }) => {
    await page.locator('[data-test="Espresso"]').click();

    await page.getByText('Total: $10.00').click();

    await expect(page.getByText('Payment details')).toBeVisible();

    await page.locator('input[name="name"]').fill('Noppakon');
    await page.locator('input[name="email"]').fill('noppakon@example.com');

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText(/Thanks for your purchase/i)).toBeVisible();
  });

});