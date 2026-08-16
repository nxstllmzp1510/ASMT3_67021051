import { test, expect } from '@playwright/test';

test('SauceDemo Guest checkout: guest cannot access checkout without login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/checkout-step-one.html');

  await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Epic sadface: You can only access '/checkout-step-one.html' when you are logged in."
  );
});
