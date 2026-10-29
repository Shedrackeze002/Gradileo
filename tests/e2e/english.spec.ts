import { expect, test } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

test('a teacher makes a Grade 10 English class from the English tab and teaches a poem, line by line', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('tab', { name: 'English' }).click();
  await expect(page.getByLabel('Class name')).toHaveValue('English 10');
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await expect(page.getByText('Grade 10 English').first()).toBeVisible();
  await page.goto(`${page.url().replace(/\/$/, '')}/lessons/e10-2-2`);
  await expect(page.getByRole('heading', { name: 'Sound and Rhythm' }).first()).toBeVisible();
  // A poem is quoted as a block that keeps its line breaks.
  const poem = page.locator('.prose-edu blockquote').filter({ has: page.locator('br') }).first();
  await expect(poem).toBeVisible();
  await expect(page.getByText(/Check your understanding · /).first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('a student who chooses English starts Grade 10 English, which is the first English course at any grade for now', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/signup');
  await page.getByLabel('Full name').fill('Ada Reader');
  await page.getByLabel('Email').fill(`ada.${Date.now() % 100000}@example.ca`);
  await page.getByLabel('Password').fill('secret12');
  await page.getByRole('button', { name: 'Create account' }).click();
  await page.waitForURL(/\/s\/welcome$/);
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page.getByText('How does mathematics feel right now?')).toHaveCount(0);
  await page.getByRole('button', { name: '12', exact: true }).click();
  await page.getByRole('button', { name: 'See my recommendation' }).click();
  await expect(page.getByRole('heading', { name: 'Grade 10 English', exact: true })).toBeVisible();
  await expect(page.getByText(/Grade 11 and 12 English courses are still being written/)).toBeVisible();
  await page.getByRole('button', { name: 'Start English 10' }).click();
  await page.waitForURL(/\/s$/);
  await expect(page.getByText('Grade 10 English · Self-paced with your AI tutor')).toBeVisible();
  expect(errors).toEqual([]);
});
