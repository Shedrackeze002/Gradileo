import { expect, test } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

test('the sign-in page leads to "Forgot password", which answers the same for any address', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/login');
  await page.getByLabel('Email or username').fill('someone@example.com');
  await page.getByRole('link', { name: 'Forgot password?' }).click();
  await page.waitForURL(/\/forgot-password/);
  // The address typed on the sign-in page is carried over.
  await expect(page.getByLabel('Email address')).toHaveValue('someone@example.com');

  // A username has no email address: the student is sent to their teacher.
  await page.getByLabel('Email address').fill('amara.o');
  await page.getByRole('button', { name: 'Send the link' }).click();
  await expect(page.getByText(/Ask your teacher for a new password/).first()).toBeVisible();

  await page.getByLabel('Email address').fill('someone@example.com');
  await page.getByRole('button', { name: 'Send the link' }).click();
  await expect(page.getByRole('status').getByText('Check your email')).toBeVisible();
  await expect(page.getByRole('status')).toContainText('If someone@example.com has a Gradileo account');
  await page.getByRole('link', { name: 'Back to sign in' }).click();
  await page.waitForURL(/\/login/);
  expect(errors).toEqual([]);
});

test('a password link that no longer works offers a new one', async ({ page }) => {
  await page.goto('/reset-password');
  await expect(page.getByRole('heading', { name: 'This link no longer works' })).toBeVisible();
  await page.getByRole('link', { name: 'Send me a new link' }).click();
  await page.waitForURL(/\/forgot-password/);
});

test('someone who arrives by a password link chooses a new password before anything else', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Student');
  // What the emailed link leaves behind: a signed-in visitor who still owes a new password.
  await page.evaluate(() => window.sessionStorage.setItem('gradileo-password-recovery', '1'));
  await page.goto('/s/work');
  await page.waitForURL(/\/reset-password/);
  await expect(page.getByRole('heading', { name: 'Choose a new password' })).toBeVisible();

  await page.getByLabel('New password', { exact: true }).fill('river-42-cedar');
  await page.getByLabel('Confirm new password').fill('river-42-ceder');
  await page.getByRole('button', { name: 'Save the new password' }).click();
  await expect(page.getByText('The passwords do not match.')).toBeVisible();

  await page.getByLabel('Confirm new password').fill('river-42-cedar');
  await page.getByRole('button', { name: 'Save the new password' }).click();
  await page.waitForURL(/\/s$/);
  await expect(page.getByText('Password changed')).toBeVisible();
  // The page is not forced again.
  await page.goto('/s/work');
  await expect(page).toHaveURL(/\/s\/work/);
  expect(errors).toEqual([]);
});
