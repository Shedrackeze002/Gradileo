import { expect, test } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

test('a teacher makes a Grade 10 Physics class from the Physics tab and teaches Ohm’s law and reflection', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await expect(page.getByRole('button', { name: /^Grade 10 Physics/ })).toHaveCount(0);
  await page.getByRole('tab', { name: 'Physics' }).click();
  // Grade 10 Physics is the only physics course so far, so the tab opens on it.
  await expect(page.getByLabel('Class name')).toHaveValue('Physics 10');
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await expect(page.getByText('Grade 10 Physics').first()).toBeVisible();
  const classUrl = page.url().replace(/\/$/, '');
  // A lesson with a graph: current against voltage for a resistor.
  await page.goto(`${classUrl}/lessons/p10-5-2`);
  await expect(page.getByRole('heading', { name: 'Voltage, Resistance and Ohm’s Law', exact: true })).toBeVisible();
  await expect(page.locator('svg[role="img"][aria-label*="current through a resistor"]').first()).toBeVisible();
  await expect(page.getByText(/Check your understanding · /).first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  // A lesson with ray diagrams.
  await page.goto(`${classUrl}/lessons/p10-4-4`);
  await expect(page.getByRole('heading', { name: 'Reflection and Refraction', exact: true })).toBeVisible();
  await expect(page.locator('svg.figure-svg[role="img"]').first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('a student who chooses physics is recommended Grade 10 Physics with no placement check, and finds its topics', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/signup');
  await page.getByLabel('Full name').fill('Isaac Learner');
  await page.getByLabel('Email').fill(`isaac.${Date.now() % 100000}@example.ca`);
  await page.getByLabel('Password').fill('secret12');
  await page.getByRole('button', { name: 'Create account' }).click();
  await page.waitForURL(/\/s\/welcome$/);
  // Physics asks only for the grade, from the year before its first course.
  await page.getByRole('button', { name: 'Physics', exact: true }).click();
  await page.getByLabel('Country or curriculum').selectOption('ca');
  await expect(page.getByRole('button', { name: 'Grade 8', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Grade 9', exact: true })).toBeVisible();
  await expect(page.getByText('How does mathematics feel right now?')).toHaveCount(0);
  await page.getByRole('button', { name: 'Grade 11', exact: true }).click();
  await page.getByRole('button', { name: 'See my recommendation' }).click();
  await expect(page.getByRole('heading', { name: 'Grade 10 Physics', exact: true })).toBeVisible();
  await expect(page.getByText(/Grade 11 and Grade 12 Physics are being written/)).toBeVisible();
  await expect(page.getByText('Physics 10 is the first course, so there is no placement check.')).toBeVisible();
  await page.getByRole('button', { name: 'Start Physics 10' }).click();
  await page.waitForURL(/\/s$/);
  await expect(page.getByText('Grade 10 Physics · Self-paced with your AI tutor')).toBeVisible();

  // Browse by topic has a Physics tab, with the course's units and lessons under its topics.
  await page.goto('/s/topics');
  await page.getByRole('tab', { name: 'Physics' }).click();
  await expect(page.getByRole('region', { name: 'Motion, forces and energy' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Forces and Newton’s laws/ })).toContainText('Grade 10');
  await expect(page.getByRole('button', { name: /Circuits and electrical power/ })).toBeVisible();
  expect(errors).toEqual([]);
});
