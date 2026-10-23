import { expect, test, type Page } from '@playwright/test';
import { signInDemo, signOut, trackErrors } from './helpers';

const demoStudent = (page: Page) =>
  page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem('educore-demo-db-v1')!);
    return db.users.find((u: { email?: string }) => u.email === 'amara@gradileo.demo').fullName as string;
  });

test('a teacher drafts a report card, edits and shares it, and the student and a parent read it', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  const name = await demoStudent(page);
  const first = name.split(' ')[0];

  // Without a MiniMax key the card is drafted from the student's data.
  await page.goto('/t/c/c_math10a/reports');
  await expect(page.getByRole('heading', { name: 'Report cards' })).toBeVisible();
  await page.getByLabel('Period').fill('Term 1');
  await page.getByRole('button', { name: `Write ${name}’s report card` }).click();
  await page.waitForURL(/\/reports\/rc_/);
  const card = page.getByRole('article', { name: `Report card for ${name}` });
  await expect(card.getByText('Report card · Term 1')).toBeVisible();
  await expect(card.getByText(`How ${first} is doing`)).toBeVisible();
  await expect(card.getByText('Course progress')).toBeVisible();

  // The teacher's own words, with {name} for the first name, show in the preview as they type.
  await page.getByLabel('Your comment').fill('{name}, your effort this term has been wonderful.');
  await expect(card.getByText(`${first}, your effort this term has been wonderful.`)).toBeVisible();
  await page.getByRole('button', { name: 'Save and share with the student' }).click();
  await expect(page.getByText('Shared with the student', { exact: true }).first()).toBeVisible();

  // A private link for a parent.
  await page.getByRole('button', { name: 'Make a private link' }).click();
  const link = await page.getByLabel('Private link').inputValue();
  expect(link).toMatch(/\/report\/[0-9a-f]{64}$/);
  await signOut(page);

  // A parent opens the link without signing in: the card, with the first name only.
  await page.goto(new URL(link).pathname);
  const shared = page.getByRole('article', { name: `Report card for ${first}` });
  await expect(shared.getByText(`${first}, your effort this term has been wonderful.`)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Print or save as PDF' })).toBeVisible();
  await expect(page.getByText(name)).toHaveCount(0);
  await page.goto(`/report/${'0'.repeat(64)}`);
  await expect(page.getByText('This report card is not available')).toBeVisible();

  // The student finds it on their Progress page.
  await signInDemo(page, 'Student');
  await page.goto('/s/progress');
  await page.getByRole('link', { name: /Term 1/ }).click();
  await expect(page.getByRole('heading', { name: 'My report card' })).toBeVisible();
  await expect(page.getByRole('article').getByText(`${first}, your effort this term has been wonderful.`)).toBeVisible();
  expect(errors).toEqual([]);
});
