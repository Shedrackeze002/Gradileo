import { expect, test } from '@playwright/test';
import { signInDemo, signOut, trackErrors } from './helpers';

const literally = (s: string) => new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

test('a student asks the class without their name, and the teacher sees who asked, replies, pins and marks it answered', async ({ page }) => {
  const errors = trackErrors(page);
  const title = `Why does the sign flip? ${Date.now() % 100000}`;

  await signInDemo(page, 'Student');
  const name = await page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem('educore-demo-db-v1')!);
    return db.users.find((u: { email?: string }) => u.email === 'amara@gradileo.demo').fullName as string;
  });
  await page.getByRole('link', { name: 'Forum' }).first().click();
  await expect(page.getByRole('heading', { name: 'Class forum' })).toBeVisible();
  await page.getByRole('button', { name: 'Ask a question' }).click();
  await page.getByLabel('Your question').fill(title);
  await page.getByLabel('Details').fill('When I divide $-2x > 6$ by $-2$, why does $>$ become $<$?');
  await page.getByRole('radio', { name: /My class, without my name/ }).check();
  await page.getByRole('button', { name: 'Post' }).click();
  await expect(page.getByRole('heading', { name: title })).toBeVisible();
  await expect(page.getByText('Class, no name')).toBeVisible();
  await expect(page.getByText('You', { exact: true })).toBeVisible();
  await signOut(page);

  // The teacher sees who asked, though the class does not.
  await signInDemo(page, 'Teacher');
  await page.goto('/t/c/c_math10a/forum');
  await expect(page.getByText(`${name} (shown to the class without a name)`)).toBeVisible();
  await page.getByRole('link', { name: literally(title) }).click();
  await expect(page.getByText('(the class sees “A classmate”)')).toBeVisible();
  await page.getByLabel('Your reply').fill('Multiplying or dividing by a negative reverses the order of numbers: $2 < 3$ but $-2 > -3$.');
  await page.getByRole('button', { name: 'Reply' }).click();
  await expect(page.getByLabel('Replies').getByText(/reverses the order of numbers/)).toBeVisible();
  await page.getByRole('button', { name: 'Pin', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Unpin' })).toBeVisible();
  await page.getByRole('button', { name: 'Mark answered' }).click();
  await expect(page.getByRole('button', { name: 'Not answered yet' })).toBeVisible();
  await signOut(page);

  // The student sees the answer, the pin and the teacher's reply.
  await signInDemo(page, 'Student');
  await page.goto('/s/forum');
  const row = page.getByRole('link', { name: literally(title) });
  await expect(row.getByText('Answered')).toBeVisible();
  await expect(row.getByLabel('Pinned')).toBeVisible();
  await expect(row.getByLabel('1 reply')).toBeVisible();
  await row.click();
  await expect(page.getByLabel('Replies').getByText('Teacher')).toBeVisible();
  expect(errors).toEqual([]);
});
