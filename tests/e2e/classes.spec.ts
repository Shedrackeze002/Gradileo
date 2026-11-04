import { expect, test } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

test('a teacher cannot add a course twice, and deletes a class made by mistake', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('tab', { name: 'Chemistry' }).click();
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  const classUrl = page.url().replace(/\/$/, '');

  // Adding Chemistry 10 again is refused, unless it is another section of the course.
  await page.goto('/t/new-class');
  await page.getByRole('tab', { name: 'Chemistry' }).click();
  await expect(page.getByText('You have this class')).toBeVisible();
  await expect(page.getByRole('alert').getByText(/You already have Chemistry 10/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Create class' })).toBeDisabled();
  await page.getByLabel('Section or period').fill('Period 3');
  await expect(page.getByRole('button', { name: 'Create class' })).toBeEnabled();

  // Deleting asks for the class name first.
  await page.goto(`${classUrl}/settings`);
  await page.getByRole('button', { name: 'Delete class' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByText('Nobody has joined this class yet.')).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Delete for good' })).toBeDisabled();
  await dialog.getByLabel('Type Chemistry 10 to confirm').fill('Chemistry 10');
  await dialog.getByRole('button', { name: 'Delete for good' }).click();
  await page.waitForURL(/\/t\?all/);
  await expect(page.getByText('Class deleted')).toBeVisible();

  // With the class gone, the course can be added again.
  await page.goto('/t/new-class');
  await page.getByRole('tab', { name: 'Chemistry' }).click();
  await expect(page.getByRole('button', { name: 'Create class' })).toBeEnabled();
  expect(errors).toEqual([]);
});
