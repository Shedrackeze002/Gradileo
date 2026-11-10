import { expect, test } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

test('a student without an email address adds one for reminders, confirms it with a code, and removes it', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Student');
  await page.goto('/settings');
  await expect(page.getByRole('heading', { name: 'Email reminders' })).toBeVisible();
  await page.getByLabel('Email address').fill('parent@example.com');
  await page.getByRole('button', { name: 'Send code' }).click();
  await expect(page.getByText('We sent a six-digit code to')).toBeVisible();
  await page.getByLabel('Code').fill('000000');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('That code is not right').first()).toBeVisible();
  await page.getByLabel('Code').fill('123456');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Reminders go to')).toContainText('parent@example.com');
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.getByLabel('Email address')).toBeVisible();
  expect(errors).toEqual([]);
});
