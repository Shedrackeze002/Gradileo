import { expect, test } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

test('a teacher makes a Grade 10 English class from the English tab and teaches a poem, line by line', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('tab', { name: 'English' }).click();
  // The English tab starts at its youngest course, Grade 5.
  await expect(page.getByLabel('Class name')).toHaveValue('English 5');
  await page.getByRole('button', { name: /^Grade 10 English/ }).click();
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

test('a teacher makes a Grade 5 English class and opens a poetry lesson', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('tab', { name: 'English' }).click();
  await expect(page.getByLabel('Class name')).toHaveValue('English 5');
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await expect(page.getByText('Grade 5 English').first()).toBeVisible();
  await page.goto(`${page.url().replace(/\/$/, '')}/lessons/e5-2-1`);
  await expect(page.getByRole('heading', { name: 'Rhyme and Rhythm' }).first()).toBeVisible();
  await expect(page.locator('.prose-edu blockquote').filter({ has: page.locator('br') }).first()).toBeVisible();
  await expect(page.getByText(/Check your understanding · /).first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('a teacher makes a Grade 6 English class and opens a poem by Tennyson', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('tab', { name: 'English' }).click();
  await page.getByRole('button', { name: /^Grade 6 English/ }).click();
  await expect(page.getByLabel('Class name')).toHaveValue('English 6');
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await expect(page.getByText('Grade 6 English').first()).toBeVisible();
  await page.goto(`${page.url().replace(/\/$/, '')}/lessons/e6-2-1`);
  await expect(page.getByRole('heading', { name: 'Personification and Hyperbole' }).first()).toBeVisible();
  await expect(page.locator('.prose-edu blockquote').filter({ hasText: 'He clasps the crag' }).locator('br').first()).toBeAttached();
  await expect(page.getByText(/Check your understanding · /).first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('a teacher makes a Grade 7 English class and opens Shakespeare’s Sonnet 18', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('tab', { name: 'English' }).click();
  await page.getByRole('button', { name: /^Grade 7 English/ }).click();
  await expect(page.getByLabel('Class name')).toHaveValue('English 7');
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await expect(page.getByText('Grade 7 English').first()).toBeVisible();
  await page.goto(`${page.url().replace(/\/$/, '')}/lessons/e7-2-4`);
  await expect(page.getByRole('heading', { name: 'The Sonnet and Free Verse' }).first()).toBeVisible();
  await expect(page.locator('.prose-edu blockquote').filter({ hasText: 'Shall I compare thee' }).locator('br').first()).toBeAttached();
  await expect(page.getByText(/Check your understanding · /).first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('a teacher makes a Grade 8 English class and opens Puck’s epilogue from A Midsummer Night’s Dream', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('tab', { name: 'English' }).click();
  await page.getByRole('button', { name: /^Grade 8 English/ }).click();
  await expect(page.getByLabel('Class name')).toHaveValue('English 8');
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await expect(page.getByText('Grade 8 English').first()).toBeVisible();
  await page.goto(`${page.url().replace(/\/$/, '')}/lessons/e8-3-3`);
  await expect(page.getByRole('heading', { name: 'Comedy and the Play Within the Play' }).first()).toBeVisible();
  await expect(page.locator('.prose-edu blockquote').filter({ hasText: 'If we shadows have offended' }).locator('br').first()).toBeAttached();
  await expect(page.getByText(/Check your understanding · /).first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('a teacher makes a Grade 9 English class and opens Prospero’s farewell to magic from The Tempest', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('tab', { name: 'English' }).click();
  await page.getByRole('button', { name: /^Grade 9 English/ }).click();
  await expect(page.getByLabel('Class name')).toHaveValue('English 9');
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await expect(page.getByText('Grade 9 English').first()).toBeVisible();
  await page.goto(`${page.url().replace(/\/$/, '')}/lessons/e9-3-3`);
  await expect(page.getByRole('heading', { name: 'Soliloquies, Songs and Staging' }).first()).toBeVisible();
  await expect(page.locator('.prose-edu blockquote').filter({ hasText: 'I’ll break my staff' }).locator('br').first()).toBeAttached();
  await expect(page.getByText(/Check your understanding · /).first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('a Grade 10 student who chooses English starts Grade 10 English, and a Grade 12 student is offered Grade 12 English with a check first', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/signup');
  await page.getByLabel('Full name').fill('Ada Reader');
  await page.getByLabel('Email').fill(`ada.${Date.now() % 100000}@example.ca`);
  await page.getByLabel('Password').fill('secret12');
  await page.getByRole('button', { name: 'Create account' }).click();
  await page.waitForURL(/\/s\/welcome$/);
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page.getByText('How does mathematics feel right now?')).toHaveCount(0);
  await page.getByLabel('Country or curriculum').selectOption('ca');
  await page.getByRole('button', { name: 'Grade 12', exact: true }).click();
  await page.getByRole('button', { name: 'See my recommendation' }).click();
  await expect(page.getByRole('heading', { name: 'Grade 12 English', exact: true })).toBeVisible();
  await expect(page.getByText(/6 questions on English 11 skills/)).toBeVisible();
  await page.getByRole('button', { name: 'Back' }).click();
  await page.getByRole('button', { name: 'Grade 10', exact: true }).click();
  await page.getByRole('button', { name: 'See my recommendation' }).click();
  await expect(page.getByRole('heading', { name: 'Grade 10 English', exact: true })).toBeVisible();
  await expect(page.getByText('English 10 is the first course, so there is no placement check.')).toBeVisible();
  await page.getByRole('button', { name: 'Start English 10' }).click();
  await page.waitForURL(/\/s$/);
  await expect(page.getByText('Grade 10 English · Self-paced with your AI tutor')).toBeVisible();
  expect(errors).toEqual([]);
});
