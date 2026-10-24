import { expect, test } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

/** The ion each main-group element forms, as a student would type it, without a caret. */
const IONS: Record<string, string> = {
  lithium: 'Li+', sodium: 'Na+', potassium: 'K+', magnesium: 'Mg2+', calcium: 'Ca2+', strontium: 'Sr2+', barium: 'Ba2+', aluminium: 'Al3+',
  nitrogen: 'N3-', phosphorus: 'P3-', oxygen: 'O2-', sulfur: 'S2-', fluorine: 'F-', chlorine: 'Cl-', bromine: 'Br-', iodine: 'I-',
};

test('a student writes an ion’s formula, sees it as it will be read, and is marked right', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Student');
  await page.goto('/s/practice?skills=c20-ion-formula');
  const prompt = page.getByText(/Write the formula of the ion that (\w+) forms/);
  await expect(prompt).toBeVisible();
  const element = /ion that (\w+) forms/.exec((await prompt.textContent()) ?? '')![1];
  await page.getByRole('textbox', { name: 'Formula' }).fill(IONS[element]);
  await expect(page.getByText('Reads as')).toBeVisible();
  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.getByText('Correct!')).toBeVisible();
  expect(errors).toEqual([]);
});

test('a teacher makes a Grade 11 Chemistry class from the Chemistry tab and teaches its titration curves', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await expect(page.getByRole('button', { name: /^Grade 11 Chemistry/ })).toHaveCount(0);
  await page.getByRole('tab', { name: 'Chemistry' }).click();
  // The tab opens on the first chemistry course, Grade 10; Grade 11 is beside it.
  await expect(page.getByLabel('Class name')).toHaveValue('Chemistry 10');
  await page.getByRole('button', { name: /^Grade 11 Chemistry/ }).click();
  await expect(page.getByLabel('Class name')).toHaveValue('Chemistry 11');
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await expect(page.getByText('Grade 11 Chemistry').first()).toBeVisible();
  await page.goto(`${page.url().replace(/\/$/, '')}/lessons/c20-4-8`);
  await expect(page.getByRole('heading', { name: 'Titration', exact: true })).toBeVisible();
  await expect(page.locator('svg[role="img"][aria-label*="pH against volume"]').first()).toBeVisible();
  await expect(page.getByText(/Check your understanding · /).first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('a Grade 10 student who chooses chemistry starts Grade 10 Chemistry, and a Grade 11 student is offered a check first', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/signup');
  await page.getByLabel('Full name').fill('Marie Learner');
  await page.getByLabel('Email').fill(`marie.${Date.now() % 100000}@example.ca`);
  await page.getByLabel('Password').fill('secret12');
  await page.getByRole('button', { name: 'Create account' }).click();
  await page.waitForURL(/\/s\/welcome$/);
  // Mathematics is chosen to begin with; chemistry asks only for the grade.
  await expect(page.getByRole('button', { name: 'Mathematics', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Chemistry', exact: true }).click();
  await expect(page.getByRole('button', { name: '5', exact: true })).toHaveCount(0);
  await expect(page.getByText('How does mathematics feel right now?')).toHaveCount(0);
  await page.getByRole('button', { name: '11', exact: true }).click();
  await page.getByRole('button', { name: 'See my recommendation' }).click();
  await expect(page.getByRole('heading', { name: 'Grade 11 Chemistry', exact: true })).toBeVisible();
  await expect(page.getByText(/6 questions on Chemistry 10 skills/)).toBeVisible();
  await page.getByRole('button', { name: 'Back' }).click();
  await page.getByRole('button', { name: '10', exact: true }).click();
  await page.getByRole('button', { name: 'See my recommendation' }).click();
  await expect(page.getByRole('heading', { name: 'Grade 10 Chemistry', exact: true })).toBeVisible();
  await expect(page.getByText('Chemistry 10 is the first course, so there is no placement check.')).toBeVisible();
  await page.getByRole('button', { name: 'Start Chemistry 10' }).click();
  await page.waitForURL(/\/s$/);
  await expect(page.getByText('Grade 10 Chemistry · Self-paced with your AI tutor')).toBeVisible();
  expect(errors).toEqual([]);
});
